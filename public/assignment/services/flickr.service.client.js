
(function () {
    angular
        .module("WebAppMaker")

        .factory("FlickrService",flickrService);


    function flickrService($http) {
        var api = {

            "searchPhotos": searchPhotos

        };

        return api;

        function searchPhotos(searchTerm) {
            var key = "62a67965e236372c4ac730358508ece1";
            var secret = "4dd2caa7c6db8dd9";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();