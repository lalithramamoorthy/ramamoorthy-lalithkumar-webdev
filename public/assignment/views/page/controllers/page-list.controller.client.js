(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            PageService.findAllPagesForWebsite(vm.websiteId)
            .then(function(pages){
                vm.pages = pages;
            });
        }
        init();
    }
})();