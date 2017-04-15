(function () {
    angular
        .module("WebAppMaker")
        .controller("HomeSearchController", homeSearchController);

    function homeSearchController(RestaurantService, $location, $rootScope, $routeParams) {
        var vm = this;
        vm.getRestaurantsByCity = getRestaurantsByCity;
        vm.getRestaurantsByNameAndCity = getRestaurantsByNameAndCity;

        function init() {
            vm.getRestaurantsByCity("boston");
        }

        init();

        function getRestaurantsByCity(city) {
            RestaurantService
                .getRestaurantsByCity(city)
                .then(
                    function (response) {
                        var restaurants = response;
                        if (restaurants.length != 0) {
                            vm.restaurants = restaurants.data.restaurants;
                            console.log(restaurants);
                            vm.error = null;
                        }
                        else {
                            vm.error = "Change a few things up and try submitting again.";
                        }
                    },
                    function (err) {
                        vm.error = "Change a few things up and try submitting again.";
                    });
        }

        function getRestaurantsByNameAndCity(rest) {
            RestaurantService
                .getRestaurantsByNameAndCity(rest.name)
                .then(
                    function (response) {
                        var restaurants = response;
                        if (restaurants.length != 0) {
                            vm.restaurants = restaurants.data.restaurants;
                            console.log(restaurants);
                            vm.error = null;
                        }
                        else {
                            vm.error = "Change a few things up and try submitting again.";
                        }
                    },
                    function (err) {
                        vm.error = "Change a few things up and try submitting again.";
                    });
        }
    }
})();