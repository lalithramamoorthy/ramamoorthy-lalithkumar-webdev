(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService.findAllWebsitesForUser(vm.userId)
                .then(function(websites){
                vm.websites = websites;
            });
        }
        init();

        function createWebsite (website) {
            WebsiteService
                .createWebsite(vm.userId, website)
                .then(function(user){
                    $location.url("/user/"+vm.userId+"/website");
                });
        };
    }
})();