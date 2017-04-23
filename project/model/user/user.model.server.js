module.exports = function () {
    var q = require('q');
    var mongoose = require ('mongoose');
    var userSchema = require('./user.schema.server.js')();
    var userModel = mongoose.model('MongooseUserProject', userSchema);

    var api = {
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId,
        addWebsite: addWebsite,
        findUserByFirstName : findUserByFirstName,
        followers: followers,
        following: following,
        isFollowingAlready: isFollowingAlready,
        removeFollowing: removeFollowing,
        removeFollowers: removeFollowers,
        getAllFollowers: getAllFollowers,
        getAllFollowing: getAllFollowing

    };
    return api;

    function getAllFollowers(userIds) {
        return userModel.find({_id: {$in: userIds}});
    }

    function getAllFollowing(userIds) {
        return userModel.find({_id: {$in: userIds}});
    }

    function findUserByFacebookId(facebookId) {
        var deferred = q.defer();
        userModel.findOne({'facebook.id': facebookId}, function(err, user){
            if(err)
                deferred.resolve(null);
            else
                deferred.resolve(user)
        } );

        return deferred.promise;
    }

    function findUserByGoogleId(googleId) {
        return userModel.findOne({'google.id': googleId});
    }

    function createUser(user) {
        var deferred = q.defer();
        userModel.create(user, function (err, doc) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUser(_id, user) {
        var deferred = q.defer();
        userModel.findByIdAndUpdate(_id, user, {new: true})
            .then(function (usr, err) {
                if(err) {
                    deferred.abort(err);
                }
                else {
                    deferred.resolve(usr);
                }
            });
        return deferred.promise;
    }

    function findAllUsers() {
        return userModel.find();
    }

    function deleteUser(_id) {
        var deferred = q.defer();
        userModel.remove({_id: _id})
            .then(function (status, err) {
                if(err) {
                    deferred.abort(err);
                }
                else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;
    }

    function findUserById(_id) {
        var deferred = q.defer();
        userModel.findById(_id)
            .then(function (user, err) {
                if(err) {
                    deferred.abort(err);
                }
                else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        userModel
            .findOne({username: username})
            .then(function (user, err) {
                if(err) {
                    deferred.abort(err);
                }
                else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByFirstName(firstName) {
        var deferred = q.defer();
        userModel
            .findOne({firstName: firstName})
            .then(function (user, err) {
                if(err) {
                    deferred.abort(err);
                }
                else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function following(loggedInUserId, userId) {
        return userModel.update({_id: loggedInUserId}, {$addToSet: {following: userId}});
    }

    function followers(userId, loggedInUserId) {
        return userModel.update({_id: userId}, {$addToSet: {followers: loggedInUserId}});
    }

    function isFollowingAlready(loggedInUserId, userId) {
        return userModel.findOne({_id: loggedInUserId, following: {$in: [userId]}});
    }

    function removeFollowing(loggedInUserId, userId) {
        return userModel.update({_id: loggedInUserId}, {$pullAll: {following: [userId]}});
    }

    function removeFollowers(userId, loggedInUserId) {
        return userModel.update({_id: userId}, {$pullAll: {followers: [loggedInUserId]}});
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        userModel.findOne({username: username, password: password})
            .then(function (user, err) {
                if(err) {
                    deferred.abort(err);
                }
                else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function addWebsite(_user, website_id) {
        var deferred = q.defer();
        userModel
            .findById(_user, function (err, user) {
                user.websites.push(website_id);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }

};