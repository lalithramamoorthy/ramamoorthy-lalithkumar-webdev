module.exports = function () {
    var userModel = require("../model/user/user.model.server.js")();
    var reviewModel = require("../model/restaurant_home/review.model.server.js")();
    var blogModel = require("../model/restaurant_home/blog.model.server")();

    var model = {
        userModel: userModel,
        reviewModel: reviewModel,
        blogModel: blogModel
    };
    reviewModel.reviewModelDependency(model.userModel);


    return model;
};
