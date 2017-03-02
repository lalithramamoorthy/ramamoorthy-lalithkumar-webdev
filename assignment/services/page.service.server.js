module.exports = function (app) {
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.put('/api/page/:pageId', updatePage);
    app.get('/api/page/:pageId', findPageById);
    app.post('/api/website/:websiteId/page', createPage);
    app.delete('/api/page/:pageId', deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;

        page.websiteId = websiteId;
        page._id = (new Date()).getTime();
        pages.push(page);
        res.status(200).json(page);
    }

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.websiteId;
        var sites = [];
        for(var p in pages) {
            if(pages[p].websiteId == wid) {
                sites.push(pages[p]);
            }
        }
        res.status(200).json(sites);
        return;
    }

    function findPageById(req, res) {

        var pid = req.params.pageId;
        var page = pages.find(function (p) {
            return p._id == pid;
        });
        res.status(200).json(page);
    }

    function updatePage(req,res) {

        var pageId = req.params.pageId;
        var page = req.body;

        for(var w in pages) {
            var pg = pages[w];
            if( pg._id == pageId ) {
                pages[w].name = page.name;
                pages[w].description = page.description;
                res.status(200).json(pages[w]);
                return;
            }
        }
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id == pageId) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
    }
};