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

        // function create(user) {
        //     UserService
        //         .findUserByUsername(user.username)
        //         .success(function (user) {
        //             vm.error = "sorry that username is taken"
        //         })
        //         .error(function(){
        //             UserService
        //                 .createUser(user)
        //                 .success(function(user){
        //                     $location.url('/profile/' + user._id);
        //                 })
        //                 .error(function () {
        //                     vm.error = 'sorry could not register';
        //                 });
        //         });
        // }

        function create(user) {
            UserService.createUser(user)
                .then(function (usr) {
                    if(usr) {
                        var user = usr.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/" + usr._id);
                    } else {
                        vm.error = "Username already exist";
                    }
                });
        }

    }
})();