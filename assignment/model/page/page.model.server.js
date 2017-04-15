module.exports = function () {
    var q = require('q')
    var mongoose = require ('mongoose');
    var pageSchema = require('./page.schema.server.js')();
    // var websiteSchema = require('./website.schema.server')();
    var pageModel = mongoose.model('MongoosePage', pageSchema);
    var websiteModel = null;

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        deletePage: deletePage,
        updatePage: updatePage,
        pageModelDependency: pageModelDependency,
        addWidget: addWidget
    };
    return api;

    function pageModelDependency(model) {
        websiteModel = model;
    }

    function createPage(_website, page) {

        var deferred = q.defer();
        pageModel.create(page)
            .then(function (pageCreate, err) {
                if(err) {
                    deferred.abort();
                } else {
                    pageModel.findByIdAndUpdate(pageCreate._id, {_website: _website}, {new: true})
                        .exec();
                    deferred.resolve(page);
                }
            })
            .then(function (pageUpdate) {
                if(err) {
                    deferred.abort()
                } else {
                    websiteModel.findWebsiteById(_website)
                        .then(function (web, err) {
                            if(err) {
                                deferred.abort();
                            } else {
                                web.pages.push(pageUpdate._id);
                                web.save();
                                websiteModel.updateWebsite(_website, web)
                                    .then(function (updatedWebsite) {
                                        deferred.resolve(page);
                                    });

                            }
                        });
                }
            });
        return deferred.promise;
    }

    function findAllPagesForWebsite(wid) {
        var deferred = q.defer();
        pageModel.find({_website: wid})
            .then(function (pages, err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(pages);
            });
        return deferred.promise;
    }

    function findPageById(pageId) {
        var deferred = q.defer();
        pageModel.findOne({_id: pageId})
            .then(function (page, err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(page);
            });
        return deferred.promise;
    }

    function deletePage(pageId) {
        var deferred = q.defer();
        pageModel.remove({_id: pageId})
            .then(function (status, err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(status);
            });
        return deferred.promise;
    }

    function updatePage(pageId, page) {
        var deferred = q.defer();
        pageModel.update({_id: pageId},{$set:page})
            .then(function (pge, err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(pge);
            });
        return deferred.promise;
    }

    function addWidget(page_id, widget_id) {
        var deferred = q.defer();
        pageModel
            .findById(page_id, function (err, page) {
                page.widgets.push(widget_id);
                page.save();
                deferred.resolve(page);
            });
        return deferred.promise;
    }

};