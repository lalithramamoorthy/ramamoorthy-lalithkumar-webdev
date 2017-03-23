module.exports = function (app,model) {
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.put('/api/page/:pageId', updatePage);
    app.get('/api/page/:pageId', findPageById);
    app.post('/api/website/:websiteId/page', createPage);
    app.delete('/api/page/:pageId', deletePage);

    // var pages = [
    //     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    // ];
    var websiteModel = model.websiteModel;
    var pageModel = model.pageModel;

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        pageModel.createPage(websiteId, page)
            .then(function (pg) {
                res.send(pg);
            }, function(err) {
                res.sendStatus(500).send(err);
            });
    }

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.websiteId;
        pageModel.findAllPagesForWebsite(wid)
            .then(function (pages) {
                res.send(pages);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPageById(req, res) {

        var pid = req.params.pageId;
        pageModel.findPageById (pid)
            .then(function (page) {
                res.send(page);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updatePage(req,res) {

        var pageId = req.params.pageId;
        var page = req.body;
        pageModel.updatePage (pageId, page)
            .then(function (pge) {
                res.send(pge);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel.deletePage(pageId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};