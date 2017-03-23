module.exports = function () {
    var mongoose = require ('mongoose');
    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'MongooseUser'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'MongooseWebApp.user'});

    return userSchema;
};