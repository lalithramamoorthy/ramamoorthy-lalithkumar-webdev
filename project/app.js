module.exports = function (app) {

    // var connectionString = 'mongodb://127.0.0.1:27017/MongooseWebAppProject';
    //
    // if (process.env.MLAB_USERNAME) {
    //     connectionString = process.env.MLAB_USERNAME + ":" +
    //         process.env.MLAB_PASSWORD + "@" +
    //         process.env.MLAB_HOST + ':' +
    //         process.env.MLAB_PORT + '/' +
    //         process.env.MLAB_APP_NAME;
    // }
    //
    var mongoose = require("mongoose");
    // mongoose.connect(connectionString);
    var q = require('q');
    mongoose.Promise = q.Promise;

    var model = require('./model/models.server.js')();
    require("./services/user.service.server")(app, model);
    require("./services/review.service.server")(app, model);
    // require("./services/page.service.server")(app, model);
    // require("./services/widget.service.server")(app, model);
}
