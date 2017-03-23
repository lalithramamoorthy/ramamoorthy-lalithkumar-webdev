module.exports = function () {
    var userModel = require("../model/user/user.model.server.js")();
    var websiteModel = require("../model/website/website.model.server.js")();
    var pageModel = require("../model/page/page.model.server.js")();
    var widgetModel = require("../model/widget/widget.model.server.js")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };
    websiteModel.websiteModelDependency(model.userModel);
    pageModel.pageModelDependency(model.websiteModel);
    widgetModel.widgetModelDependency(model.pageModel);

    return model;
};
