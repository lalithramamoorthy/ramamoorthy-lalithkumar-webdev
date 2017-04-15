module.exports = function () {
    var mongoose = require ('mongoose');
    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        followers:[String],
        following:[String],
        imgUrl: String,
        dateCreated: {type: Date, default: Date.now},
        facebook: {
            id:    String,
            token: String
        },
        type: {type: String, default: "restaurant"},
        roles: {type: String, default: "user", enum: ["user", "admin", "critic"]}
    }, {collection: 'MongooseWebAppProject.user'});

    return userSchema;
};