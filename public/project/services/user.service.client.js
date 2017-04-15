(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService($http, $rootScope) {

        var api = {
            "login": login,
            "logout": logout,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "deleteUser": deleteUser,
            "findUserByFirstName":findUserByFirstName,
            "followUser": followUser,
            "unFollowUser": unFollowUser,
            "isFollowingAlready": isFollowingAlready,
            "getLoggedInUser": getLoggedInUser,
            "setCurrentUser": setCurrentUser,
            "createAdminUser": createAdminUser,
            "updateAdminUser": updateAdminUser,
            "deleteAdminUser": deleteAdminUser,
            "findAllUsersAdmin": findAllUsersAdmin
        };
        return api;

        function followUser(userId, loggedInUserId) {
            return  $http.put("/api/project/user/" + loggedInUserId + "/following/" + userId);

        }

        function unFollowUser(userId, loggedInUserId) {
            return  $http.put("/api/project/user/" + loggedInUserId + "/unfollows/" + userId);

        }

        function isFollowingAlready(userId, loggedInUserId) {
            return  $http.get("/api/project/user/" + loggedInUserId + "/isFollowingAlready/" + userId);

        }

        function logout() {
            return $http.post("/api/project/logout");
        }
        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user?username="+username)
                .then(function (res) {
                    return res.data;
                });
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/project/user/"+userId, newUser)
                .then(function (res) {
                    return res.data;
                });
        }

        function findUserById(userId) {
            return $http.get("/api/project/user/"+userId)
                .then(function (res) {
                    return res.data;
                });
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username="+username+"&password="+password)
                .then(function (res) {
                    return res.data;
                });
        }

        function createUser(user) {
            return $http.post("/api/project/user", user)
                .then(function (res) {
                    return res.data;
                });
        }

        function deleteUser(userId) {
            return $http.delete("/api/project/user/"+userId)
                .then(function (res) {
                    return res.data;
                });
        }

        function findUserByFirstName(firstName) {
            return $http.get("/api/project/user/firstName/"+firstName)
                .then(function (res) {
                    return res.data;
                });
        }

        // function getUser() {
        //     return $http.get("/api/project/loggedin");
        // }

        function getLoggedInUser() {
            console.log("client getLoggedIn");
            return $http.get("/api/project/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function createAdminUser(user) {
            return $http.post('/api/project/admin/user', user);
        }

        function updateAdminUser(userId, user) {
            return $http.put('/api/project/admin/user/' + userId, user);
        }

        function deleteAdminUser(userId) {
            return $http.delete('/api/project/admin/user/' + userId);
        }

        function findAllUsersAdmin() {
            return $http.get("/api/project/admin/user");
        }

    }
})();