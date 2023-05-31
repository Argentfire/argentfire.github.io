(function() {

    var app = angular.module("Agency", ["ngRoute"]);

    app.config(function($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "./views/home.html",
                controller: ""
            })
            .when("/journeys", {
                templateUrl: "./views/journeys.html",
                controller: "JourneyController"
            })
            .when("/tickets", {
                templateUrl: "./views/tickets.html",
                controller: "TicketController"
            })
            .when("/vehicles", {
                templateUrl: "./views/vehicles.html",
                controller: ""
            })
            .otherwise({redirectTo:"/home"});
    });
}());