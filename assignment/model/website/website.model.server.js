module.exports = function () {
    var q = require('q');
    var mongoose = require ('mongoose');
    mongoose.Promise = q.Promise;
    // var userSchema = require('./user.schema.server.js')();
    var websiteSchema = require('./website.schema.server.js')();
    var websiteModel = mongoose.model('MongooseWebsite', websiteSchema);
    var userModel = null;

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsitesById: findWebsitesById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        websiteModelDependency: websiteModelDependency,
        addPage: addPage
    };
    return api;

    function websiteModelDependency(model) {
        userModel = model;
    }

    function createWebsiteForUser(_user, website) {

        var deferred = q.defer();
        websiteModel.create(website)
            .then(function (websiteCreate, err) {
                if(err) {
                    deferred.abort();
                } else {
                    websiteModel.findByIdAndUpdate(websiteCreate._id, {_user: _user}, {new: true})
                        .exec();
                    deferred.resolve(website);
                }
                })
            .then(function (websiteUpdate) {
                if(err) {
                    deferred.abort()
                } else {
                    userModel.findUserById(_user)
                        .then(function (user, err) {
                            if(err) {
                                deferred.abort();
                            } else {
                                user.websites.push(websiteUpdate._id);
                                user.save();
                                deferred.resolve(website);
                            }
                        });
                }
            });
        return deferred.promise;
    }

    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        websiteModel.find({_user: userId})
            .then(function (websites, err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(websites);
            });
        return deferred.promise;
    }

    function findWebsitesById(websiteId) {
        var deferred = q.defer();
        websiteModel.findOne({_id: websiteId})
            .then(function (website, err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(website);
            });
        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        var deferred = q.defer();
        websiteModel.update({_id: websiteId},{$set:website})
            .then(function (web, err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(web);
            });
        return deferred.promise;
    }

    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        websiteModel.remove({_id: websiteId})
            .then(function (status, err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(status);
            });
        return deferred.promise;
    }

    function addPage(website_id, page_id) {
        var deferred = q.defer();
        websiteModel
            .findById(website_id, function (err, website) {
                website.pages.push(page_id);
                website.save();
                deferred.resolve(website);
            });
        return deferred.promise;
    }

};