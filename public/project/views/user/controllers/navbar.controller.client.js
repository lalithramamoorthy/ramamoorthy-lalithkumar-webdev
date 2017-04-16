(function () {
    angular
        .module("WebAppMaker")
        .controller("NavBarController", navBarController);

    function navBarController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        vm.logout = logout;

        function init() {

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

    }
})();