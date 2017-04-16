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
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/profile/"+user._id);
                        } else {
                            vm.error = "User not found";
                        }
                    });
        }

        //     function login(user) {
        //     var promise = UserService
        //         .findUserByCredentials(user.username, user.password)
        //         .then(function (usr) {
        //             if(usr) {
        //                 $location.url("/profile/"+usr._id);
        //             } else {
        //                 vm.error = "User not found";
        //             }
        //         });
        // };
    }
})();