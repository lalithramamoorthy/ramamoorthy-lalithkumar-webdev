(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.update = update;

        function init() {

            var promise = WebsiteService.findAllWebsitesForUser(vm.userId);
            promise.success(function(websites){
                vm.websites = websites;
            });

            var promise1 = WebsiteService.findWebsiteById(vm.websiteId);
            promise1.success(function(website){
                vm.website = website;
            });
        }
        init();

        function deleteWebsite () {
            var promise = WebsiteService.deleteWebsite(vm.websiteId);

            promise.success(function () {
                $location.url("/user/"+vm.userId+"/website");
            })
        };

        function update(websiteId, newWebsite) {

            var promise =  WebsiteService.updateWebsite(websiteId, newWebsite);

            promise.success(function (web) {
                if(web != null) {
                    vm.message = "website successfully updated"
                    $location.url("/user/"+vm.userId+"/website");
                } else {
                    vm.error = "unable to update website";
                }
            });

        };
    }
})();