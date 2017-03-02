(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            "createPage": createPage,
            "findAllPagesForWebsite": findAllPagesForWebsite,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId, page) {
            return $http.post("/api/website/"+websiteId+"/page",page);
        }

        function findPageById(pid) {
            return $http.get("/api/page/"+pid);
        }

        function findAllPagesForWebsite(wid) {
            return $http.get("/api/website/"+wid+"/page");
        }

        function deletePage(pid) {
            return $http.delete("/api/page/"+pid);
        }

        function updatePage(pageId, page) {
            return $http.put("/api/page/"+pageId, page);
        }
    }
})();