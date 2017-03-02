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

            return $http.post("/api/page/"+pageId+"/widget", widget);
        }

        function findAllWidgetsForPage(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
        }

        function findWidgetById(widgetId) {
            return $http.get('/api/widget/'+widgetId);
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+widgetId);
        }

        function updateWidget(widgetId, widget) {
            return $http.put('/api/widget/'+widgetId, widget);
        }
    }
})();