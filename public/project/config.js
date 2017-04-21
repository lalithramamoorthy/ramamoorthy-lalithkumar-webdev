(function () {
        angular
            .module("WebAppMaker")
            .config(configuration);

    function checkLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .getLoggedInUser()
            .then(
                function (response) {
                    var currentUser = response;
                    if(currentUser) {
                        UserService.setCurrentUser(currentUser);
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/");
                    }
                },
                function (err) {
                    console.log(err);
                    deferred.resolve();
                }
            );

        return deferred.promise;
    }
    function checkAdmin(UserService, $q, $location) {
        var deferred = $q.defer();

        UserService
            .getLoggedInUser()
            .then(function (response) {
                var user = response.data;

                if (user) {
                    if (user != null && user.roles == 'admin') {
                        UserService.setCurrentUser(user);
                        deferred.resolve();
                    }
                    else {
                        deferred.reject();
                        $location.url("/");
                    }
                }
                else {
                    deferred.reject();
                    $location.url("/");
                }
            });

        return deferred.promise;
    }

    function getLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .getLoggedInUser()
            .then(
                function (response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        UserService.setCurrentUser(currentUser);
                    }
                    deferred.resolve();
                },
                function (err) {
                    console.log(err);
                    deferred.resolve();
                }
            );

        return deferred.promise;
    }

        function configuration($routeProvider, $httpProvider) {


            $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
            $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';


            $routeProvider
                .when("/login", {
                    templateUrl: 'views/user/templates/login.view.client.html',
                    controller: 'loginController',
                    controllerAs: 'model'
                })
                .when("/register", {
                    templateUrl: 'views/user/templates/register.view.client.html',
                    controller: 'registerController',
                    controllerAs: 'model'
                })
                .when("/user/profile/reviews/:uid",{
                    templateUrl: 'views/user/templates/userReviewsPage.html',
                    controller: "UserController",
                    controllerAs: "model",
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }
                })
                .when("/profile/:uid", {
                    templateUrl: 'views/user/templates/profile.view.client.html',
                    controller: 'profileController',
                    controllerAs: 'model',
                    resolve: {checkLoggedIn: checkLoggedIn}
                })
                .when("/home",{
                    templateUrl: 'views/restaurant_home/templates/homeSearchPage.html',
                    controller: "HomeSearchController",
                    controllerAs: "model",
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }

                })
                .when("/user/restaurant/:rid/articles",{
                    templateUrl: 'views/restaurant_home/templates/blog.view.client.html',
                    controller: "BlogController",
                    controllerAs: "model",
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }
                })
                .when("/user/restaurant/:rid",{
                    templateUrl: 'views/restaurant_home/templates/reviewPage.html',
                    controller: "ReviewController",
                    controllerAs: "model",
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }
                })
                .when("/user/search/restaurants/:sid",{
                    templateUrl: 'views/restaurant_home/templates/home.search.client.html',
                    controller: "HomeController",
                    controllerAs: "model",
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }
                })
                .when("/user/restaurants",{
                    templateUrl: 'views/restaurant_home/templates/homeSearchPage.html',
                    controller: "HomeSearchController",
                    controllerAs: "model",
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }
                })
                .when("/user/admin", {
                    templateUrl: 'views/user/templates/admin.view.client.html',
                    controller: "AdminController",
                    controllerAs: "model",
                    resolve: {
                        checkAdmin: checkAdmin
                    }
                })
                .when("/", {
                    templateUrl: 'views/restaurant_home/templates/homeSearchPage.html',
                    controller: "HomeSearchController",
                    controllerAs: "model",
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }
                })
                .otherwise({
                    redirectTo: "/"
                });
        }

    })();