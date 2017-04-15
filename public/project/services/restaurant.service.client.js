(function(){
    angular
        .module("WebAppMaker")
        .factory('RestaurantService', restaurantService);

    function restaurantService($http) {
       var searchURL =  "https://opentable.herokuapp.com/api/restaurants?city=&page=&name=&zip=&per_page=25";
        var api = {
            getRestaurantsByCity : getRestaurantsByCity,
            getRestaurantsByNameAndCity : getRestaurantsByNameAndCity
        };
        return api;

        function getRestaurantsByCity(city) {
            var url = searchURL
                .replace("city=", "city="+city);
            return $http.get(url);
        }

        function getRestaurantsByNameAndCity(name) {
            var url = searchURL
                .replace("name=", "name="+name);
            return $http.get(url);
        }
    }
})();