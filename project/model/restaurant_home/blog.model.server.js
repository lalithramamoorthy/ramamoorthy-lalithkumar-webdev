module.exports = function () {
    var q = require('q');
    var mongoose = require ('mongoose');
    var BlogSchema = require('./blog.schema.server.js')();
    var BlogModel = mongoose.model('MongooseBlogProject', BlogSchema);
    var userModel = null;

    var api = {
        createBlog: createBlog,
        findAllBlogsforRestaurant: findAllBlogsforRestaurant,
        findBlogsByUserId: findBlogsByUserId,
        // BlogModelDependency: BlogModelDependency,
        updateBlog: updateBlog,
        deleteBlog: deleteBlog
    };
    return api;

    // function BlogModelDependency(model) {
    //     userModel = model;
    // }

    function createBlog(userId, restaurantId, Blog) {
        Blog.userId = userId;
        Blog.restaurantId = restaurantId;
        var deferred = q.defer();
        BlogModel.create(Blog, function (err, doc) {
            if(err){
                deferred.abort(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllBlogsforRestaurant(restaurantid) {
        var deferred = q.defer();
        BlogModel.find({restaurantId : restaurantid})
            .then(function (restaurants, err) {
                if(err) {
                    deferred.abort();
                } else {
                    deferred.resolve(restaurants);
                }
            })
        return deferred.promise;
    }

    function findBlogsByUserId(userId) {
        var deferred = q.defer();
        BlogModel.find({userId : userId})
            .then(function (Blogs, err) {
                if(err) {
                    deferred.abort();
                } else {
                    deferred.resolve(Blogs);
                }
            })
        return deferred.promise;
    }

    function updateBlog(BlogId, Blog) {
        delete Blog._id;
        Blog.timestamp = new Date();
        return BlogModel.update({_id: BlogId}, {$set: Blog});
    }

    function deleteBlog(BlogId) {
        return BlogModel.remove({_id: BlogId});
    }

};