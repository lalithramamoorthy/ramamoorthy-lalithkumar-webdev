(function () {
    angular
        .module("WebAppMaker")
        .controller("ReviewController", reviewController);

    function reviewController(UserService, ReviewService, $location, $rootScope, $routeParams) {
        var vm = this;
        // vm.userid = $routeParams.uid;
        vm.restaurantId = $routeParams.rid;
        console.log("ReviewsPage RestaurantId "+vm.restaurantId)
        vm.createReview = createReview;
        vm.navigateToUserPage = navigateToUserPage;

        function init() {
            console.log("sappu")
            UserService
                .getLoggedInUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        vm.userid = vm.user._id+"";
                        console.log("++++++++++++++++++++++++++++"+ user);
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
                        vm.reviews.push(response);
                        findUserByReviewUserId(vm.reviews);
                    }
                })
        }

        function findUserByReviewUserId(reviews) {
            reviews.forEach(function (element, index, array) {
                UserService.findUserById(reviews[index].userId)
                    .then(function (response) {
                        if (response) {
                            reviews[index].userName = response.firstName;
                            // reviews[index].imgUrl = response.data.imgUrl;
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

    }
})();