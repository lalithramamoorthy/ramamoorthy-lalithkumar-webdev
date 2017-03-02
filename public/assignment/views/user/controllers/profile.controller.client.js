(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService,$location) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.deleteU = deleteU;
        vm.update = update;


        function init() {
            var promise = UserService.findUserById(userId);
            promise.success(function(user){
                vm.user = user;
            });
        }
        init();

        function update(newUser) {
            var promise =  UserService
                .updateUser(userId, newUser);

                promise.success(function (user) {
                    if(user != null) {
                        vm.message = "User Successfully Updated!"
                    } else {
                        vm.error = "Unable to update user";
                    }
                });
        };

        function deleteU() {
            var promise = UserService.deleteUser(userId);
            promise.success(function () {
                $location.url("/login");
            })
        };

    }
})();