module.exports = function (app, model) {
    var passport = require('passport');

    var auth = authorized;
    var multer = require('multer');
    var uploadsFolderPath = __dirname + '/../../public/uploads';
    var upload = multer({dest: uploadsFolderPath});

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
    app.get("/auth/facebook", passport.authenticate('facebook', {scope: ['public_profile', 'email']}));
    app.post('/api/project/logout', logout);
    app.get ('/api/project/loggedin', getLoggedInUser);
    app.get("/api/project/admin/user", auth, findAllUsersAdmin);
    app.post("/api/project/admin/user", auth, createAdminUser);
    app.delete('/api/project/admin/user/:userId', auth, deleteAdminUser);
    app.put('/api/project/admin/user/:userId', auth, updateAdminUser);


    var userModel = model.userModel;
    var reviewModel = model.reviewModel;
    var LocalStrategy = require('passport-local').Strategy;
    // var FacebookStrategy = require('passport-facebook-token').Strategy;

    passport.use('project', new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // app.get("/auth/facebook/callback", passport.authenticate('facebook', {
    //         failureRedirect: '/assignment/#/login'
    //     }),
    //     function (req, res) {
    //         var redirectUrl = "/assignment/index.html#/user/" + req.user._id.toString();
    //         res.redirect(redirectUrl);
    //     });

    // var facebookConfig = {
    //     clientID     : process.env.FACEBOOK_CLIENT_ID || '456733637999245',
    //     clientSecret : process.env.FACEBOOK_CLIENT_SECRET || '573e09fa495c89690d9cb0cfa0233c55',
    //     callbackURL  : process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/project/index.html#/profile/',
    //     profileFields: ['id', 'name', 'emails']
    // };

    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@gmail.com"  },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@gmail.com"  },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jannunzi@gmail.com" }
    // ];
    // passport.use(new LocalStrategy(localStrategy));

    // passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    //
    // function facebookStrategy(token, refreshToken, profile, done) {
    //     model.findUserByFacebookId(profile.id)
    //         .then(function (user) {
    //             if (user) {
    //                 return done(null, user);
    //             }
    //             else {
    //                 var email = profile.emails[0].value;
    //                 var emailParts = email.split("@");
    //                 var newUser = {
    //                     facebook: {
    //                         id: profile.id,
    //                         token: token
    //                     },
    //
    //                     username: emailParts[0],
    //                     firstName: profile.name.givenName,
    //                     lastName: profile.name.familyName,
    //                     email: email
    //                 };
    //                 model.createUser(newUser)
    //                     .then(function (newUser) {
    //                             if (newUser) {
    //                                 return done(null, newUser);
    //                             }
    //                             else {
    //                                 return done(null, false, {message: "User not created."})
    //                             }
    //                         },
    //                         function (err) {
    //                             return done(err);
    //                         });
    //             }
    //         });
    // }

    // function localStrategy(username, password, done) {
    //     userModel
    //         .findUserByCredentials(username, password)
    //         .then(
    //             function (user) {
    //                 if (user.username === username && user.password === password) {
    //                     return done(null, user);
    //                 } else {
    //                     return done(null, false);
    //                 }
    //             },
    //             function (err) {
    //                 if (err) {
    //                     return done(err);
    //                 }
    //             }
    //         );
    // }

    function projectLocalStrategy(username, password, done) {
        console.log(username, password);
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log(user);
                    if (user && password == user.password) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
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
        console.log("++++++++++"+req.body);
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
        console.log("Server"+username);
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
        console.log(user);
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
