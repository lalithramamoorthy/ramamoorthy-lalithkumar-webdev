(function(){
    angular
        .module("WebAppMaker")
        .controller("UserController", userController);

    function userController($routeParams, UserService, ReviewService,  $location, $rootScope) {
        var vm = this;
        vm.userid = $routeParams.uid;
        vm.followUser = followUser;
        vm.unFollowUser = unFollowUser;



        function init() {
            vm.loggedInUserId = $rootScope.currentUser._id;

            UserService.findUserById(vm.userid)
                .then(function (user) {
                    vm.user = user;
                    isFollowingAlready();
                });

            ReviewService.findReviewsByUserId(vm.userid)
                .then(function (reviews) {
                    vm.reviews = reviews;
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

    }
})();
