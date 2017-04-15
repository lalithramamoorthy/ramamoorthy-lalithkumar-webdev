(function () {
        angular
            .module("WebAppMaker")
            .controller("profileController", profileController);

        function profileController($routeParams, UserService, $location, $rootScope) {
            var vm = this;
            var userId = $routeParams['uid'];
            vm.deleteU = deleteU;
            vm.Update = Update;
            vm.logout = logout;

            function init() {
                UserService.findUserById(userId)
                    .then(function (user) {
                        vm.user = user;
                    });
                vm.updateProfilePicture = "/api/project/user/" + userId;
            }

            init();

            function logout() {
                UserService
                    .logout()
                    .then(
                        function (response) {
                            $rootScope.currentUser = null;
                            $location.url("/");
                        });
            }

            function Update(newUser) {
                UserService
                    .updateUser(userId, newUser)
                    .then(function (user) {
                        if (user) {
                            vm.message = "Profile successfully updated";
                        } else {
                            vm.error = "Unable to update Profile";
                        }
                    });
            };

            function deleteU() {
                UserService.deleteUser(userId)
                    .then(function (user) {
                        if (user) {
                            $location.url("/login");
                        } else {
                            vm.error = "Unable to delete User";
                        }
                    });
            };
        }
    })();