(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location, $rootScope) {
        var vm = this;
        vm.login = login;


        function init() {
        }

        init();

        function login(user) {
            UserService
                .login(user)
                .then(
                    function (response) {
                        if (response) {
                            if(response.data == "true") {
                                vm.error = "User not found";
                            } else {
                                var user = response.data;
                                $rootScope.currentUser = user;
                                $location.url("/home");
                            }
                        } else {
                            vm.error = "User not found";
                        }
                    });
        }
    }
})();