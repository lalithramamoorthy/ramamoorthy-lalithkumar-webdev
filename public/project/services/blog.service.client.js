(function(){
    angular
        .module("WebAppMaker")
        .factory('BlogService', BlogService);

    function BlogService($http) {
        var searchURL =  "https://opentable.herokuapp.com/api/restaurants/:id";
        var api = {
            findRestaurantById : findRestaurantById,
            findAllBlogsforRestaurant : findAllBlogsforRestaurant,
            findBlogsByUserId : findBlogsByUserId,
            createBlog : createBlog,
            updateBlog : updateBlog,
            deleteBlog : deleteBlog
        };
        return api;

        function findRestaurantById(id) {
            var url = searchURL
                .replace(":id", id);
            return $http.get(url);
        }

        function findAllBlogsforRestaurant(restaurantId) {
            return $http.get("/api/project/user/restaurant/blogs/"+restaurantId)
                .then(function (res) {
                    return res.data;
                });
        }

        function createBlog(Blog, restaurantId, userId) {
            return $http.post("/api/project/blog/user/"+userId+"/restaurant/" + restaurantId, Blog)
                .then(function (res) {
                    return res.data;
                });
        }

        function findBlogsByUserId(userId) {
            return $http.get("/api/project/user/blogs/"+userId)
                .then(function (res) {
                    return res.data;
                });
        }

        function updateBlog(restaurantId, BlogId, Blog) {
            return $http.put("/api/project/blog/restaurant/" + restaurantId + "/blog/" + BlogId, Blog);
        }

        function deleteBlog(restaurantId, BlogId) {
            return $http.delete("/api/project/blog/restaurant/" + restaurantId + "/blog/" + BlogId);
        }

    }
})();