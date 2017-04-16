(function () {
    angular
        .module("WebAppMaker")
        .controller("BlogController", BlogController);

    function BlogController(UserService, BlogService, $location, $rootScope, $routeParams) {
        var vm = this;
        // vm.userid = $routeParams.uid;
        vm.restaurantId = $routeParams.rid;
        vm.createBlog = createBlog;
        vm.navigateToUserPage = navigateToUserPage;
        vm.selectBlog = selectBlog;
        vm.updateBlog = updateBlog;
        vm.deleteBlog = deleteBlog;
        vm.cancelBlog = cancelBlog;

        function init() {
            UserService.getLoggedInUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        vm.userid = vm.user._id+"";
                        return UserService.findUserById(vm.userid);
                    }
                })
                .then(function (response) {
                    if (response) {
                        vm.user = response;
                    }
                });

            BlogService.findRestaurantById(vm.restaurantId)
                .then(function (response) {
                    vm.restaurant = response.data;
                });

            BlogService.findAllBlogsforRestaurant(vm.restaurantId)
                .then(function (Blogs) {
                    vm.Blogs = Blogs;
                    findUserByBlogUserId(vm.Blogs);
                });

        }

        init();

        function createBlog(Blog) {

            BlogService.createBlog(Blog, vm.restaurantId, vm.userid)
                .then(function (response) {;
                    if (response) {
                        vm.selectedIndex = -1;
                        vm.Blogs.push(response);
                        findUserByBlogUserId(vm.Blogs);
                    }
                })
        }

        function updateBlog(Blog) {

            BlogService.updateBlog(vm.restaurantId, Blog._id, Blog)
                .then(function (response) {
                    var status = response.data;
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.Blogs[vm.selectedIndex] = Blog;
                        vm.selectedIndex = -1;
                        vm.Blog = {};
                        vm.message = "Blog updated";
                        findUserByBlogUserId(vm.Blogs);
                    }
                });
        }

        function deleteBlog(index) {
            var BlogId = vm.Blogs[index]._id;
            BlogService
                .deleteBlog(vm.movieId, BlogId)
                .then(function (response) {
                    var status = response.data;
                    if (status.n == 1 && status.ok == 1) {
                        vm.Blogs.splice(index, 1);
                        vm.selectedIndex = -1;
                        vm.Blog = {};
                        findUserByBlogUserId(vm.Blogs);
                    }
                });
        }

        function findUserByBlogUserId(Blogs) {
            Blogs.forEach(function (element, index, array) {
                UserService.findUserById(Blogs[index].userId)
                    .then(function (response) {
                        if (response) {
                            Blogs[index].userName = response.firstName;
                            Blogs[index].imgUrl = response.imgUrl;
                            Blogs[index].roles = response.roles;
                        }
                    });
            });
        }

        function navigateToUserPage(username) {
            UserService.findUserByFirstName(username)
                .then(function (response) {
                    if (response) {
                        $location.url("/user/profile/Blogs/"+response._id );
                        // Blogs[index].imgUrl = response.data.imgUrl;
                    }
                });
        }

        function selectBlog(index) {
            vm.selectedIndex = index;
            var editBlog = {
                "restaurantId": vm.Blogs[index]["restaurantId"],
                "userId": vm.Blogs[index]["userId"],
                "_id": vm.Blogs[index]["_id"],
                "description": vm.Blogs[index]["description"],
                "dateCreated": vm.Blogs[index]["dateCreated"]
            }
            vm.editBlog = editBlog;
        }

        function cancelBlog() {
            vm.selectedIndex = -1;
        }

    }
})();