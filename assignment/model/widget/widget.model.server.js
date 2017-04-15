module.exports = function () {
    var q = require('q')
    var mongoose = require ('mongoose');
    var widgetSchema = require('./widget.schema.server.js')();
    var widgetModel = mongoose.model('WebAppWidget', widgetSchema);
    var pageModel = null;
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        widgetModelDependency: widgetModelDependency
    };
    return api;

    function widgetModelDependency(model) {
        pageModel = model;
    }

    function createWidget(_page, widget) {
        var deferred = q.defer();
        widgetModel.create(widget)
            .then(function (widgetCreate, err) {
                if(err) {
                    deferred.abort();
                } else {
                    widgetModel.findByIdAndUpdate(widgetCreate._id, {_page: _page}, {new: true})
                        .exec();
                    deferred.resolve(widget);
                }
            }).then(function (widgetUpdate) {
                if(err) {
                    deferred.abort();
                } else {
                    pageModel.findPageById(_page)
                        .then(function (page, err) {
                            if(err) {
                                deferred.abort();
                            } else {
                                page.widgets.push(widgetUpdate._id);
                                page.save();
                                deferred.resolve(page);
                            }
                        });
                }
        });
        return deferred.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();
        widgetModel.find({_page: pageId})
            .then(function (widgets, err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(widgets);
            });
        return deferred.promise;
    }

    function findWidgetById(wid) {
        var deferred = q.defer();
        widgetModel.findOne({_id: wid})
            .then(function (widget, err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(widget);
            });
        return deferred.promise;
    }

    function deleteWidget(widgetId) {
        var deferred = q.defer();
        widgetModel.remove({_id: widgetId})
            .then(function (status, err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(status);
            });
        return deferred.promise;
    }

    function updateWidget(_id, widget) {
        var deferred = q.defer();
        widgetModel.update({_id: _id},{$set:widget})
            .then(function (wid, err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(wid);
            });
        return deferred.promise;
    }

};