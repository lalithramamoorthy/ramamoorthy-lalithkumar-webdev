(function(){
    angular
        .module("WebAppMaker")
        .factory('ReviewService', reviewService);

    function reviewService($http) {
        var searchURL =  "https://opentable.herokuapp.com/api/restaurants/:id";
        var api = {
            findRestaurantById : findRestaurantById,
            findAllReviewsforRestaurant : findAllReviewsforRestaurant,
            findReviewsByUserId : findReviewsByUserId,
            createReview : createReview
        };
        return api;

        function findRestaurantById(id) {
            var url = searchURL
                .replace(":id", id);
            return $http.get(url);
        }

        function findAllReviewsforRestaurant(restaurantId) {
            return $http.get("/api/project/user/restaurant/reviews/"+restaurantId)
                .then(function (res) {
                    return res.data;
                });
        }

        function createReview(review, restaurantId, userId) {
            return $http.post("/api/project/user/"+userId+"/restaurant/" + restaurantId, review)
                .then(function (res) {
                    return res.data;
                });
        }

        function findReviewsByUserId(userId) {
            return $http.get("/api/project/user/reviews/"+userId)
                .then(function (res) {
                    return res.data;
                });
        }

    }
})();