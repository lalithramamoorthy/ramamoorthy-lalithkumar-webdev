module.exports = function () {
    var mongoose = require ('mongoose');
    var websiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'MongooseUser'},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'MongoosePage'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'MongooseWebApp.website'});

    return websiteSchema;
};
