(function(){
    angular
        .module("WebAppMaker")
        .controller("UserController", userController);

    function userController($routeParams, UserService, ReviewService,  $location, $rootScope, BlogService) {
        var vm = this;
        vm.userid = $routeParams.uid;
        vm.followUser = followUser;
        vm.unFollowUser = unFollowUser;
        vm.navigateToUserPage = navigateToUserPage;

        function init() {
            UserService
                .getLoggedInUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.loggedInUser = user;
                        vm.loggedInUserId = vm.loggedInUser._id+"";
                        return UserService.findUserById(vm.loggedInUserId);
                    }
                })
                .then(function (response) {
                    if (response) {
                        vm.loggedInUser = response;
                    }
                });

            UserService.findUserById(vm.userid)
                .then(function (user) {
                    vm.user = user;
                    isFollowingAlready();
                });

            ReviewService.findReviewsByUserId(vm.userid)
                .then(function (reviews) {
                    vm.reviews = reviews;
                });

            BlogService.findBlogsByUserId(vm.userid)
                .then(function (blogs) {
                    vm.blogs = blogs;
                });


                UserService.getAllFollowers(vm.userid)
                .then(function (response) {
                    var users = response.data;
                    if (users) {
                        vm.followedusers = users;
                    }
                });

            UserService.getAllFollowing(vm.userid)
                .then(function (response) {
                    var users = response.data;
                    if (users) {
                        vm.followingusers = users;
                    }
                });
        }

        init();

        function followUser() {
            UserService.followUser(vm.userid, vm.loggedInUserId)
                .then(function (usr) {
                        var status = usr.data;
                        if (status.ok == 1 && (status.n == 1 || status.nModified == 0)) {
                            vm.isFollowingAlready = true;
                        }
                        else {
                            vm.isFollowingAlready = false;
                        }
                });
        }

        function unFollowUser() {
            UserService.unFollowUser(vm.userid, vm.loggedInUserId)
                .then(function (usr) {
                    var status = usr.data;
                    if (status.ok == 1 && (status.n == 1 || status.nModified == 0)) {
                        vm.isFollowingAlready = false;
                    }
                    else {
                        vm.isFollowingAlready = true;
                    }
                });
        }

        function isFollowingAlready() {
            UserService
                .isFollowingAlready(vm.userid, vm.loggedInUserId)
                .then(function (response) {
                    if (response.data != "null" && response.data != "") {
                        vm.isFollowingAlready = true;
                    }
                    else {
                        vm.isFollowingAlready = false;
                    }
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
