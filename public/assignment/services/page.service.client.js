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
            return $http.post("/api/website/"+websiteId+"/page",page)
                .then(function (res) {
                    return res.data;
                });
        }

        function findPageById(pid) {
            return $http.get("/api/page/"+pid)
                .then(function (res) {
                    return res.data;
                });
        }

        function findAllPagesForWebsite(wid) {
            return $http.get("/api/website/"+wid+"/page")
                .then(function (res) {
                    return res.data;
                });
        }

        function deletePage(pid) {
            return $http.delete("/api/page/"+pid)
                .then(function (res) {
                    return res.data;
                });
        }

        function updatePage(pageId, page) {
            return $http.put("/api/page/"+pageId, page)
                .then(function (res) {
                    return res.data;
                });
        }
    }
})();