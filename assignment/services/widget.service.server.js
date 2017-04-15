module.exports = function (app, model) {
    var multer = require('multer');
    var uploadsFolderPath = __dirname + '/../../public/uploads';
    var upload = multer({dest: uploadsFolderPath});

    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.put('/api/widget/:widgetId', updateWidget);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.post('/api/page/:pageId/widget', createWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);

    var widgetModel = model.widgetModel;

    // var widgets = [
    //     {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //     {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     {
    //         "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //         "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"
    //     },
    //     {
    //         "_id": "456",
    //         "widgetType": "HTML",
    //         "pageId": "321",
    //         "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several model today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'
    //     },
    //     {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     {
    //         "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%","name":"myvideo",
    //         "url": "https://youtu.be/AM2Ivdi9c4E"
    //     },
    //     {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    // ];

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widgetModel.createWidget(pageId, widget)
            .then(function (wdgt) {
                res.send(wdgt);
            }, function(err) {
                res.sendStatus(500).send(err);
            });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel.findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.send(widgets);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel.findWidgetById (widgetId)
            .then(function (widget) {
                res.send(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        widgetModel.updateWidget (widgetId, widget)
            .then(function (wdgt) {
                res.send(wdgt);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var myFile = req.file;
        widgetModel.findWidgetById (widgetId)
            .then(function (widget) {
                widget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                res.redirect(req.get('referrer') + "#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        // widget = widgets.find(function (i) {
        //     return i._id == widgetId;
        // });


    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel.deleteWidget(widgetId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};