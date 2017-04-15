(function () {
    angular
        .module("WebAppMaker")
        .controller("ReviewController", reviewController);

    function reviewController(UserService, ReviewService, $location, $rootScope, $routeParams) {
        var vm = this;
        // vm.userid = $routeParams.uid;
        vm.restaurantId = $routeParams.rid;
        vm.createReview = createReview;
        vm.navigateToUserPage = navigateToUserPage;
        vm.selectReview = selectReview;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        vm.cancelReview = cancelReview;

        function init() {
            UserService.getLoggedInUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        vm.userid = vm.user._id+"";
                        return UserService.findUserById(vm.userid);
                    }
                })
                .then(function (response) {
                    if (response) {
                        vm.user = response;
                    }
                });

            ReviewService.findRestaurantById(vm.restaurantId)
                .then(function (response) {
                    vm.restaurant = response.data;
                });

            ReviewService.findAllReviewsforRestaurant(vm.restaurantId)
                .then(function (reviews) {
                    vm.reviews = reviews;
                    findUserByReviewUserId(vm.reviews);
                });

        }

        init();

        function createReview(review) {

            ReviewService.createReview(review, vm.restaurantId, vm.userid)
                .then(function (response) {;
                    if (response) {
                        vm.selectedIndex = -1;
                        vm.reviews.push(response);
                        findUserByReviewUserId(vm.reviews);
                    }
                })
        }

        function updateReview(review) {

            ReviewService.updateReview(vm.restaurantId, review._id, review)
                .then(function (response) {
                    var status = response.data;
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.reviews[vm.selectedIndex] = review;
                        vm.selectedIndex = -1;
                        vm.review = {};
                        vm.message = "Review updated";
                        findUserByReviewUserId(vm.reviews);
                    }
                });
        }

        function deleteReview(index) {
            var reviewId = vm.reviews[index]._id;
            ReviewService
                .deleteReview(vm.movieId, reviewId)
                .then(function (response) {
                    var status = response.data;
                    if (status.n == 1 && status.ok == 1) {
                        vm.reviews.splice(index, 1);
                        vm.selectedIndex = -1;
                        vm.review = {};
                        findUserByReviewUserId(vm.reviews);
                    }
                });
        }

        function findUserByReviewUserId(reviews) {
            reviews.forEach(function (element, index, array) {
                UserService.findUserById(reviews[index].userId)
                    .then(function (response) {
                        if (response) {
                            reviews[index].userName = response.firstName;
                             reviews[index].imgUrl = response.imgUrl;
                            reviews[index].roles = response.roles;
                        }
                    });
            });
        }

        function navigateToUserPage(username) {
            UserService.findUserByFirstName(username)
                .then(function (response) {
                    if (response) {
                        $location.url("/user/profile/reviews/"+response._id );
                        // reviews[index].imgUrl = response.data.imgUrl;
                    }
                });


        }

        function selectReview(index) {
            vm.selectedIndex = index;
            var editReview = {
                "restaurantId": vm.reviews[index]["restaurantId"],
                "userId": vm.reviews[index]["userId"],
                "_id": vm.reviews[index]["_id"],
                "description": vm.reviews[index]["description"],
                "dateCreated": vm.reviews[index]["dateCreated"]
            }
            vm.editReview = editReview;
        }

        function cancelReview() {
            vm.selectedIndex = -1;
        }

    }
})();