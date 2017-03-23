(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "findAllWebsitesForUser": findAllWebsitesForUser,
            "updateWebsite": updateWebsite
        };
        return api;

        function findWebsiteById(wid) {
            return $http.get("/api/website/"+wid)
                .then(function (res) {
                    console.log(res.data);
                return res.data;
            });
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId)
                .then(function (res) {
                    return res.data;
                });
        }

        function createWebsite(userId, website) {
           return $http.post("/api/user/"+userId+"/website", website)
               .then(function (res) {
                   return res.data;
               });
        }

        function findAllWebsitesForUser(userId) {
            return $http.get("/api/user/"+userId+"/website")
                .then(function (res) {
                    return res.data;
                });
        }

        function updateWebsite(websiteId, newWebsite) {
            return $http.put("/api/website/"+websiteId, newWebsite)
                .then(function (res) {
                    return res.data;
                });
        }
    }
})();