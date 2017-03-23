(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, FlickrService, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;

        vm.websiteId = $routeParams.wid;

        vm.pageId = $routeParams.pid;

        vm.widgetId = $routeParams.wgid;


        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var w = {
                url: url,
                type: "IMAGE"
            };
            WidgetService.createWidget(vm.pageId, w)
                .then(function (widget) {
                    if (widget) {
                        $location.url("/user/" + vm.userId + "/website/" +  vm.websiteId + "/page/" + vm.pageId + "/widget");
                    } else {
                        vm.error = "Error";
                    }
                });
        }
    }
})();