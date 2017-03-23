(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;


        function init() {
        }
        init();

        function login(user) {
            var promise = UserService
                .findUserByCredentials(user.username, user.password)
                .then(function (usr) {
                    if(usr) {
                        $location.url("/profile/"+usr._id);
                    } else {
                        vm.error = "User not found";
                    }
                });
        };
    }
})();