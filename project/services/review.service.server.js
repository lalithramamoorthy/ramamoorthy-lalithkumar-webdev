module.exports = function (app, model) {

    app.put("/api/project/restaurant/:restaurantid/review/:reviewId", updateReview);
    app.delete("/api/project/restaurant/:restaurantid/review/:reviewId", deleteReview);
    app.get("/api/project/user/restaurant/reviews/:restaurantid", findAllReviewsforRestaurant);
    app.post("/api/project/user/:userid/restaurant/:restaurantid", createReview);
    app.get("/api/project/user/reviews/:userid", findReviewsByUserId);
    var q = require('q');
    var reviewModel = model.reviewModel;

    function createReview(req, res) {
        var userId = req.params.userid;
        var restaurantId = req.params.restaurantid;
        var review = req.body;
        reviewModel
            .createReview(userId, restaurantId, review)
            .then(
                function (review) {
                    res.json(review);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllReviewsforRestaurant(req, res) {
        var restaurantId = req.params.restaurantid;
        reviewModel.findAllReviewsforRestaurant(restaurantId)
            .then(function (reviews) {
                    res.json(reviews);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findReviewsByUserId(req, res) {
        var userId = req.params.userid;
        reviewModel.findReviewsByUserId(userId)
            .then(function (reviews) {
                    res.json(reviews);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateReview(req, res) {
        var reviewId = req.params.reviewId;
        var review = req.body;
        reviewModel.updateReview(reviewId, review)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;
        reviewModel.deleteReview(reviewId)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



}
