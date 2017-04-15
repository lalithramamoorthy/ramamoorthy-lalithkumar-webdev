module.exports = function () {
    var userModel = require("../model/user/user.model.server.js")();
    var reviewModel = require("../model/restaurant_home/review.model.server.js")();

    var model = {
        userModel: userModel,
        reviewModel: reviewModel
    };
    reviewModel.reviewModelDependency(model.userModel);


    return model;
};
