module.exports = function () {
    var userModel = require("../model/user/user.model.server.js")();
    var reviewModel = require("../model/restaurant_home/review.model.server.js")();
    // var pageModel = require("page/page.model.server.js")();
    // var widgetModel = require("widget/widget.model.server.js")();

    var model = {
        userModel: userModel,
        reviewModel: reviewModel
        // pageModel: pageModel,
        // widgetModel: widgetModel
    };
    reviewModel.reviewModelDependency(model.userModel);
    // pageModel.pageModelDependency(model.websiteModel);
    // widgetModel.widgetModelDependency(model.pageModel);

    return model;
};
