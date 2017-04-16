module.exports = function (app, model) {

    app.put("/api/project/blog/restaurant/:restaurantid/blog/:BlogId", updateBlog);
    app.delete("/api/project/blog/restaurant/:restaurantid/blog/:BlogId", deleteBlog);
    app.get("/api/project/user/restaurant/Blogs/:restaurantid", findAllBlogsforRestaurant);
    app.post("/api/project/blog/user/:userid/restaurant/:restaurantid", createBlog);
    app.get("/api/project/user/blogs/:userid", findBlogsByUserId);
    var q = require('q');
    var BlogModel = model.blogModel;

    function createBlog(req, res) {
        var userId = req.params.userid;
        var restaurantId = req.params.restaurantid;
        var Blog = req.body;
        BlogModel
            .createBlog(userId, restaurantId, Blog)
            .then(
                function (Blog) {
                    res.json(Blog);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllBlogsforRestaurant(req, res) {
        var restaurantId = req.params.restaurantid;
        BlogModel.findAllBlogsforRestaurant(restaurantId)
            .then(function (Blogs) {
                    res.json(Blogs);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findBlogsByUserId(req, res) {
        var userId = req.params.userid;
        BlogModel.findBlogsByUserId(userId)
            .then(function (Blogs) {
                    res.json(Blogs);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateBlog(req, res) {
        var BlogId = req.params.BlogId;
        var Blog = req.body;
        BlogModel.updateBlog(BlogId, Blog)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteBlog(req, res) {
        var BlogId = req.params.BlogId;
        BlogModel.deleteBlog(BlogId)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

}
