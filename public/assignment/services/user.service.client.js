(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService($http) {

        var api = {
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "deleteUser": deleteUser
        };
        return api;

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username)
                .then(function (res) {
                    return res.data;
                });
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser)
                .then(function (res) {
                    return res.data;
                });
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId)
                .then(function (res) {
                    return res.data;
                });
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password)
                .then(function (res) {
                    return res.data;
                });
        }

        function createUser(user) {
            return $http.post("/api/user", user)
                .then(function (res) {
                    return res.data;
                });
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId)
                .then(function (res) {
                    return res.data;
                });
        }
    }
})();