(function () {
    angular
        .module("WebAppMaker")
        .controller("NavBarController", navBarController);

    function navBarController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        vm.logout = logout;

        function init() {
            // vm.userid = $routeParams.uid;
            // console.log(vm.userid);
            console.log($rootScope.currentUser);
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