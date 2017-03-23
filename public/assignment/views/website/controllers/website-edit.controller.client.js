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

            WebsiteService.findAllWebsitesForUser(vm.userId)
                .then(function(websites){
                vm.websites = websites;
            });

            WebsiteService.findWebsiteById(vm.websiteId)
                .then(function(website){
                vm.website = website;
            });
        }
        init();

        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId)

                .then(function () {
                $location.url("/user/"+vm.userId+"/website");
            })
        };

        function update(websiteId, newWebsite) {

            WebsiteService.updateWebsite(websiteId, newWebsite)

                .then(function (web) {
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