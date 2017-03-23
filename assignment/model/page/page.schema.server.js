module.exports = function () {
    var mongoose = require ('mongoose');
    var pageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'MongooseWebsite'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'MongooseWidget'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'MongooseWebApp.page'});

    return pageSchema;
};