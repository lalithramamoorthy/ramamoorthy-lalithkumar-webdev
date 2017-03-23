(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.update = update;

        function init() {
            PageService.findAllPagesForWebsite(vm.websiteId)
                .then(function(pages){
                vm.pages = pages;
            });

            PageService.findPageById(vm.pageId)
                .then(function(page){
                vm.page = page;
            });
        }
        init();

        function deletePage () {
            PageService.deletePage(vm.pageId).
                then(function(page) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            });
        };

        function update(pageId, newPage) {

            PageService.updatePage(pageId, newPage)
            .then(function (page) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                if(page == null) {
                    vm.error = "unable to update page";
                } else {
                    vm.message = "page successfully updated"
                }
            });
        };
    }
})();