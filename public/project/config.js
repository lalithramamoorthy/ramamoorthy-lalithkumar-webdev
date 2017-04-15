(function () {
        angular
            .module("WebAppMaker")
            .config(configuration);

    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/project/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            if (user) {
                console.log("config "+user);
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                deferred.reject();
                // $location.url('/');
            }
        });
        return deferred.promise;
    };

    var loggedIn = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/project/loggedin').success(function (user) {

            if (!user) {
                deferred.reject();
            } else {

                $rootScope.currentUser = user;

                console.log("config " + user);
                console.log($rootScope.currentUser);
                deferred.resolve();
            }
        }).error(function (response) {
            console.log(response);
            deferred.reject();
        });
        return deferred.promise;
    };

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
                    controllerAs: "model"
                })
                .when("/profile/:uid", {
                    templateUrl: 'views/user/templates/profile.view.client.html',
                    controller: 'profileController',
                    controllerAs: 'model',
                    resolve: {checkLoggedin: checkLoggedin}
                })
                .when("/home",{
                    templateUrl: 'views/restaurant_home/templates/homeSearchPage.html',
                    controller: "HomeSearchController",
                    controllerAs: "model"
                })
                .when("/user/restaurant/:rid",{
                    templateUrl: 'views/restaurant_home/templates/reviewPage.html',
                    controller: "ReviewController",
                    controllerAs: "model"

                })
                .when("/user/restaurants",{
                    templateUrl: 'views/restaurant_home/templates/homeSearchPage.html',
                    controller: "HomeSearchController",
                    controllerAs: "model"

                })
                .when("/", {
                    templateUrl: 'views/restaurant_home/templates/homeSearchPage.html',
                    controller: "HomeSearchController",
                    controllerAs: "model"
                })

                // .when("/user/:uid/website/new",{
                //     templateUrl: 'views/website/templates/website-new.view.client.html',
                //     controller: "WebsiteNewController",
                //     controllerAs: "model"
                // })
                // .when("/user/:uid/website/:wid",{
                //     templateUrl: 'views/website/templates/website-edit.view.client.html',
                //     controller: "WebsiteEditController",
                //     controllerAs: "model"
                // })
                // .when("/user/:uid/website/:wid/page",{
                //     templateUrl: 'views/page/templates/page-list.view.client.html',
                //     controller: "PageListController",
                //     controllerAs: "model"
                // })
                // .when("/user/:uid/website/:wid/page/new",{
                //     templateUrl: 'views/page/templates/page-new.view.client.html',
                //     controller: "PageNewController",
                //     controllerAs: "model"
                // })
                // .when("/user/:uid/website/:wid/page/:pid",{
                //     templateUrl: 'views/page/templates/page-edit.view.client.html',
                //     controller: "PageEditController",
                //     controllerAs: "model"
                // })
                // .when("/user/:uid/website/:wid/page/:pid/widget",{
                //     templateUrl: 'views/widget/templates/widget-list.view.client.html',
                //     controller: "WidgetListController",
                //     controllerAs: "model"
                // })
                // .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                //     templateUrl: "views/widget/templates/widget-choose.view.client.html",
                //     controller: "WidgetNewController",
                //     controllerAs: "model"
                // })
                // .when("/user/:uid/website/:wid/page/:pid/widget/new/flickr", {
                //     templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                //     controller: "FlickrImageSearchController",
                //     controllerAs: "model"
                // })
                // .when("/user/:uid/website/:wid/page/:pid/widget/new/:wgt", {
                //     templateUrl: "views/widget/templates/widget-new.view.client.html",
                //     controller: "WidgetNewController",
                //     controllerAs: "model"
                // })
                // .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
                //     templateUrl: 'views/widget/templates/widget-edit.view.client.html'
                //     ,controller: "WidgetEditController",
                //     controllerAs: "model"
                // })
                // .when("/",{
                //     templateUrl: 'views/user/templates/login.view.client.html',
                //     controller: 'loginController',
                //     controllerAs: 'model'
                // })
                // .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/flickr", {
                //     templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                //     controller: "FlickrImageSearchController",
                //     controllerAs: "model"
                // })
                // .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/flickr", {
                //     templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                //     controller: "FlickrImageSearchController",
                //     controllerAs: "model"
                // })
                .otherwise({
                    templateUrl: 'views/restaurant_home/templates/homeSearchPage.html',
                    controller: "HomeSearchController",
                    controllerAs: "model",
                    resolve: {loggedIn: loggedIn}
                });


        }

    })();

angular.module("WebAppMaker").run(["$rootScope", function ($rootScope) {
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
        console.log("error");
        console.log(event, current, previous, rejection);
        // if(rejection === coachAppConfig.errorCode.loginRequired){
        //     window.location.hash="#" + coachAppConfig.paths.login;
        // }
    });
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous, rejection) {
        console.log("Success");
        console.log(event, current, previous, rejection);
        // if(rejection === coachAppConfig.errorCode.loginRequired){
        //     window.location.hash="#" + coachAppConfig.paths.login;
        // }
    });
    $rootScope.$on('$routeChangeStart', function(event, current, previous, rejection) {
        console.log("Start");
        console.log(event, current, previous, rejection);
        // if(rejection === coachAppConfig.errorCode.loginRequired){
        //     window.location.hash="#" + coachAppConfig.paths.login;
        // }
    });
}]);