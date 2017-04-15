(function () {
    angular
        .module("WebAppMaker")
        .controller("AdminController", AdminController);

    function AdminController(UserService) {
        var model = this;
        model.add = add;
        model.select = select;
        model.remove = remove;
        model.update = update;

        function init() {
            model.selected = -1;
            UserService
                .findAllUsersAdmin()
                .then(handleSuccess, handleError);
        }

        init();

        model.predicate = 'username';
        model.reverse = true;
        model.order = function (predicate) {
            model.reverse = (model.predicate === predicate) ? !model.reverse : false;
            model.predicate = predicate;
        };

        function add(user) {
            UserService.createAdminUser(user)
                .then(handleSuccess, handleError);
        }

        function update(user) {
            UserService.updateAdminUser(user._id, user)
                .then(handleSuccess, handleError);
        }

        function remove(user) {
            UserService.deleteAdminUser(user._id)
                .then(handleSuccess, handleError);
        }


        function select(user) {
            model.addUser = angular.copy(user);
            model.selected = 0;
        }

        function handleSuccess(response) {
            model.users = response.data;
            model.addUser = {};
            model.selected = -1;
        }

        function handleError(error) {
            model.error = error;
        }
    }
})();