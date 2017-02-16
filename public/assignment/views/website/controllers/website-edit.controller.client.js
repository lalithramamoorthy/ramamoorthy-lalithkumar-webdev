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
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        };

        function update(websiteId, newWebsite) {
            var web = WebsiteService.updateWebsite(websiteId, newWebsite);
            $location.url("/user/"+vm.userId+"/website");
            if(web == null) {
                vm.error = "unable to update website";
            } else {
                vm.message = "website successfully updated"
            }
        };
    }
})();