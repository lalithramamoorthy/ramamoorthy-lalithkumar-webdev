module.exports = function () {
    var mongoose = require ('mongoose');
    var reviewSchema = mongoose.Schema({
        restaurantId: String,
        userId: String,
        description: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'MongooseWebAppProject.review'});

    return reviewSchema;
};