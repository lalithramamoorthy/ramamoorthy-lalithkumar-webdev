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
           UserService.findUserById(userId)
                .then(function (user){
                vm.user = user;
            });
        }
        init();

        function update(newUser) {
            UserService
                .updateUser(userId, newUser)
                .then(function (user) {
                    if(user) {
                        vm.message = "Profile successfully updated";
                    }else {
                        vm.error = "Unable to update Profile";
                    }
                });
        };

        function deleteU() {
            UserService.deleteUser(userId)
                .then(function(user) {
                    if(user) {
                        $location.url("/login");
                    } else {
                        vm.error = "Unable to delete User";
                    }
                });
        };
    }
})();