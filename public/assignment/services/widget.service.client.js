(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "createWidget" : createWidget,
            "findAllWidgetsForPage" : findAllWidgetsForPage,
            "findWidgetById" : findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {

            return $http.post("/api/page/"+pageId+"/widget", widget)
                .then(function (res) {
                    console.log(res.data);
                    return res.data;
                });
        }

        function findAllWidgetsForPage(pageId) {
            return $http.get("/api/page/"+pageId+"/widget")
                .then(function (res) {
                    return res.data;
                });
        }

        function findWidgetById(widgetId) {
            return $http.get('/api/widget/'+widgetId)
                .then(function (res) {
                    return res.data;
                });
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+widgetId)
                .then(function (res) {
                    return res.data;
                });
        }

        function updateWidget(widgetId, widget) {
            return $http.put('/api/widget/'+widgetId, widget)
                .then(function (res) {
                    return res.data;
                });
        }
    }
})();