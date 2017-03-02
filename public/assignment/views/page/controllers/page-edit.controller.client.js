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
            var promise = PageService.findAllPagesForWebsite(vm.websiteId);
            promise.success(function(pages){
                vm.pages = pages;
            });

            var promise1 = PageService.findPageById(vm.pageId);
            promise1.success(function(page){
                vm.page = page;
            });
        }
        init();

        function deletePage () {
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };

        function update(pageId, newPage) {

            var promise = PageService.updatePage(pageId, newPage);
            promise.success(function (page) {
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