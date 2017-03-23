module.exports = function (app, model) {
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.put('/api/website/:websiteId', updateWebsite);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.post('/api/user/:userId/website', createWebsiteForUser);
    app.delete('/api/website/:websiteId', deleteWebsite);

    var websiteModel = model.websiteModel;
    //var userModel = model.userModel;

    // var websites = [
    //     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
    //     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
    //     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
    //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
    //     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
    //     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
    // ];

    function findAllWebsitesForUser(req, res) {
        var developerId = req.params.userId;
        websiteModel.findAllWebsitesForUser(developerId)
            .then(function (website) {
                res.send(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWebsiteById(req, res) {
        var wid = req.params.websiteId;
        websiteModel.findWebsitesById(wid)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateWebsite(req, res) {
        var _id = req.params.websiteId;
        var newWebsite = req.body;
        websiteModel.updateWebsite (_id, newWebsite)
            .then(function (web) {
                res.send(web);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createWebsiteForUser(req, res) {
        var userId = req.params.userId;
        var newWebsite = req.body;
        websiteModel.createWebsiteForUser(userId, newWebsite)
            .then(function (website) {
                res.send(website);
            }, function(err) {
            res.sendStatus(500).send(err);
        });
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel.deleteWebsite(websiteId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};