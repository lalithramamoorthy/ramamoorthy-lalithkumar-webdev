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
                .findUserByCredentials(user.username, user.password);
            promise.success(function(user){
                if(user) {
                    $location.url("/profile/"+user._id);
                } else {
                    vm.error = "User not found";
                }
            });
        };
    }
})();