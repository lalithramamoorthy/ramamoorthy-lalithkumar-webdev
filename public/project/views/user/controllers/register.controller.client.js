(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($routeParams, UserService,  $location, $rootScope) {
        var vm = this;
        vm.create = create;

        function init() {
        }
        init();

        function create(user) {
            if (vm.password2 !== user.password) {
                vm.error = "Passwords entered do not match";
            }
            else {
                UserService.findUserByUsername(user.username)
                    .then(function (response) {
                        if (response) {
                            vm.error = "Username is taken!!."
                        }
                        else {
                            UserService.createUser(user)
                                .then(function (response) {
                                    var user = response;
                                    $rootScope.currentUser = user;
                                    $location.url("/user/" + user._id);
                                })
                                .catch(function (error) {
                                    vm.error = "Unable to register user due to an error: " + error;
                                });
                        }
                    });
            }
        }

    }
})();