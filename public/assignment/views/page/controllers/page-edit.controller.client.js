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
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function deletePage () {
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };

        function update(pageId, newPage) {
            var page = PageService.updatePage(pageId, newPage);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            if(page == null) {
                vm.error = "unable to update page";
            } else {
                vm.message = "page successfully updated"
            }
        };
    }
})();