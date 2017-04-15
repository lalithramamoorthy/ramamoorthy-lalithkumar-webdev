module.exports = function () {
    var q = require('q');
    var mongoose = require ('mongoose');
    var reviewSchema = require('./review.schema.server.js')();
    var reviewModel = mongoose.model('MongooseReviewProject', reviewSchema);
    var userModel = null;

    var api = {
        createReview: createReview,
        findAllReviewsforRestaurant: findAllReviewsforRestaurant,
        findReviewsByUserId: findReviewsByUserId,
        reviewModelDependency: reviewModelDependency,
        updateReview: updateReview,
        deleteReview: deleteReview
    };
    return api;

    function reviewModelDependency(model) {
        userModel = model;
    }

    function createReview(userId, restaurantId, review) {
        review.userId = userId;
        review.restaurantId = restaurantId;
        var deferred = q.defer();
        reviewModel.create(review, function (err, doc) {
            if(err){
                deferred.abort(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllReviewsforRestaurant(restaurantid) {
        var deferred = q.defer();
       reviewModel.find({restaurantId : restaurantid})
           .then(function (restaurants, err) {
           if(err) {
               deferred.abort();
           } else {
               deferred.resolve(restaurants);
           }
       })
        return deferred.promise;
    }

    function findReviewsByUserId(userId) {
        var deferred = q.defer();
        reviewModel.find({userId : userId})
            .then(function (reviews, err) {
                if(err) {
                    deferred.abort();
                } else {
                    deferred.resolve(reviews);
                }
            })
        return deferred.promise;
    }

    function updateReview(reviewId, review) {
        delete review._id;
        review.timestamp = new Date();
        return reviewModel.update({_id: reviewId}, {$set: review});
    }

    function deleteReview(reviewId) {
        return reviewModel.remove({_id: reviewId});
    }

};