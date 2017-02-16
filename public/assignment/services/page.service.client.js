(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = (new Date()).getTime();
            pages.push(page);
        }

        function findPageById(pid) {
            for(var p in pages) {
                if(pages[p]._id == pid) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function findPageByWebsiteId(wid) {
            var sites = [];
            for(var p in pages) {
                if(pages[p].websiteId == wid) {
                    sites.push(pages[p]);
                }
            }
            return sites;
        }

        function deletePage(pid) {
            for(var p in pages) {
                if(pages[p]._id == pid) {
                    pages.splice(p, 1);
                }
            }
        }


        function updatePage(pageId, page) {
            for(var w in pages) {
                var pg = pages[w];
                if( pg._id == pageId ) {
                    pages[w].name = page.name;
                    pages[w].description = page.description;
                    return pg;
                }
            }
            return null;
        }
    }
})();