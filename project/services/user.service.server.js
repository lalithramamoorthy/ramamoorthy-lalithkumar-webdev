module.exports = function (app, model) {
    var passport = require('passport');

    var auth = authorized;
    var multer = require('multer');
    var uploadsFolderPath = __dirname + '/../../public/uploads';
    var upload = multer({dest: uploadsFolderPath});

    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['emails', 'name']
    };

    // var GoogleConfig = {
    //     clientID     : process.env.GOOGLE_CLIENT_ID,
    //     clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    //     callbackURL  : process.env.GOOGLE_CALLBACK_URL
    // };

    var userModel = model.userModel;
    var reviewModel = model.reviewModel;
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    // var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var bcrypt = require("bcrypt-nodejs");
    passport.use('project', new LocalStrategy(projectLocalStrategy));
    // passport.use('Google',new GoogleStrategy(GoogleConfig,GoogleStrategy))


    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));



    // var FacebookStrategy = require('passport-facebook-token').Strategy;

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get("/api/project/user", findUser);
    app.post("/api/project/user", createUser);
    app.post("/api/project/user/:id", upload.single('profileImg'), updateProfilePicture);
    app.put("/api/project/user/:loggedInUser/following/:userid", followUser);
    app.put("/api/project/user/:loggedInUser/unfollows/:userid", unFollowUser);
    app.get('/api/project/user/:loggedInUser/isFollowingAlready/:userid', isFollowingAlready);
    app.get("/api/project/user/firstName/:fname", findUserByFirstName);
    app.get("/api/project/user?username=username", findUserByUsername);
    app.get("/api/project/user?username=username&password=password", findUserByCredentials);
    app.get("/api/project/user/:userId", findUserById);
    app.put("/api/project/user/:userId", updateUser);
    app.delete("/api/project/user/:userId", deleteUser);
    app.post('/api/project/login', passport.authenticate('project'), login);
    //app.get("/auth/facebook", passport.authenticate('facebook', {scope: ['public_profile', 'email']}));
    app.post('/api/project/logout', logout);
    app.get ('/api/project/loggedin', getLoggedInUser);
    app.get("/api/project/admin/user", auth, findAllUsersAdmin);
    app.post("/api/project/admin/user", auth, createAdminUser);
    app.delete('/api/project/admin/user/:userId', auth, deleteAdminUser);
    app.put('/api/project/admin/user/:userId', auth, updateAdminUser);
    // app.get('/auth/google', passport.authenticate('Google', {scope: ['profile','email']}));
    // app.get('/auth/google/callback',
    //     passport.authenticate('Google', {
    //         successRedirect: "/profile/null",
    //         failureRedirect: '/'
    //     }));
    app.get("/auth/facebook", passport.authenticate('facebook'));
    app.get("/auth/facebook/callback", passport.authenticate('facebook'),
        function (req, res) {
            var redirectUrl = "/project/#/profile/" + req.user._id;
            return res.redirect(redirectUrl);
        });

    // function GoogleStrategy(token, refreshToken, profile, done){
    //     userModel
    //         .findUserByGoogleId(profile.id)
    //         .then(
    //             function(user) {
    //                 if(user) {
    //                     return done(null, user);
    //                 } else {
    //                     var email = profile.emails[0].value;
    //                     var emailParts = email.split("@");
    //                     var newGoogleUser = {
    //                         username:  emailParts[0],
    //                         firstName: profile.name.givenName,
    //                         lastName:  profile.name.familyName,
    //                         email:     email,
    //                         google: {
    //                             id:    profile.id,
    //                             token: token
    //                         }
    //                     };
    //                     return userModel.createUser(newGoogleUser);
    //                 }
    //             },
    //             function(err) {
    //                 if (err) { return done(err); }
    //             }
    //         )
    //         .then(
    //             function(user){
    //                 return done(null, user);
    //             },
    //             function(err){
    //                 if (err) { return done(err); }
    //             }
    //         );
    // }

    function facebookStrategy(token, refreshToken, profile, done) {
        var profileid = profile.id + "";
        userModel.findUserByFacebookId(profileid)
            .then(function (user) {
                if (!user) {
                    var newUser = {
                        facebook: {
                            id: profile.id,
                            token: token
                        },
                        username: profile._json.first_name,
                        firstName: profile._json.first_name,
                        lastName: profile._json.last_name
                    };
                    userModel.createUser(newUser)
                        .then(function (newUser) {

                                if (newUser) {

                                    return done(null, newUser);
                                }
                                else {
                                    return done(null, false, {message: "User not created."})
                                }
                            },
                            function (err) {
                                return done(err);
                            });
                }
                else {
;
                    return done(null, user);
                }
            }, function(err) {

            });
    }

    function projectLocalStrategy(username, password, done) {

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    else {
                        return done(null, true);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function updateUser(req, res) {

        var userId = req.params.userId;
        var newUser = req.body;

        userModel.updateUser(userId, newUser)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;

        userModel.findUserByUsername(username)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserByFirstName(req, res) {
        var firstName = req.params.fname;
        userModel.findUserByFirstName(firstName)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function followUser(req, res) {
        var loggedInUserId = req.params.loggedInUser;
        var userId = req.params.userid;
        userModel.following(loggedInUserId, userId)
            .then(
                function (response) {
                    return userModel.followers(userId, loggedInUserId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (response) {
                    res.send(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function unFollowUser(req, res) {
        var loggedInUserId = req.params.loggedInUser;
        var userId = req.params.userid;
        userModel.removeFollowing(loggedInUserId, userId)
            .then(
                function (response) {
                    return userModel.removeFollowers(userId, loggedInUserId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (response) {
                    res.send(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function isFollowingAlready(req, res) {
        var loggedInUserId = req.params.loggedInUser;
        var userid = req.params.userid;
        userModel
            .isFollowingAlready(loggedInUserId, userid)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        userModel.findUserByCredentials(username, password)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createUser(req, res) {
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);
        userModel.createUser(newUser)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel.deleteUser(userId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function login(req, res) {
        var user = req.user;
        console.log(user);
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function getLoggedInUser(req, res) {
        var user = req.isAuthenticated()? req.user : null;
        res.send(user);
    }

    function findAllUsers(res) {
        userModel.findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function findAllUsersAdmin(req, res) {
        if (isAdmin(req.user)) {
            userModel.findAllUsers()
                .then( function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function isAdmin(user) {
        if (user.roles.indexOf("admin") > -1) {
            return true
        }
        return false;
    }

    function createAdminUser(req, res) {
        var newUser = req.body;
        userModel.findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user == null) {
                        return userModel.createUser(newUser)
                            .then(function () {
                                    return userModel.findAllUsers();
                                }, function (err) {
                                    res.status(400).send(err);
                                });
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }).then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function deleteAdminUser(req, res) {
        if (isAdmin(req.user)) {
            userModel.deleteUser(req.params.userId)
                .then( function (user) {
                        return userModel.findAllUsers();
                    }, function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function updateAdminUser(req, res) {
        var newUser = req.body;
        if (!isAdmin(req.user)) {
            delete newUser.roles;
        }
        userModel.updateUser(req.params.userId, newUser)
            .then(function (user) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateProfilePicture(req, res) {
        var userId = req.params.id;
        var user = req.body;

        var imageFile = req.file;
        if (imageFile) {
            var destination = imageFile.destination;
            var path = imageFile.path;
            var originalname = imageFile.originalname;
            var size = imageFile.size;
            var mimetype = imageFile.mimetype;
            var filename = imageFile.filename;
            user.imgUrl = "/uploads/" + filename;
        }
        userModel.updateUser(userId, user)
            .then(function (response) {
                    return userModel.findUserById(userId);
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(function (response) {
                req.session.currentUser = response;
                res.redirect(req.header('Referer') + "#/profile/" + userId);
            }, function (err) {
                res.status(400).send(err);
            });
    }
}
