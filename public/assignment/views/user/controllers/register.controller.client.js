(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($routeParams, UserService,  $location) {
        var vm = this;
        vm.create = create;

        function init() {
        }
        init();

        function create(user) {
            var newUser = {_id:"", username:"", password:"", email:""};
            newUser.username = user.username;
            newUser.password = user.password;
            newUser = UserService.createUser(newUser);

            if(newUser !== null) {
                $location.url('/profile/' + newUser._id);
            } else {
                vm.message = "user successfully updated"
            }
        };

    }
})();