angular.module('CoffeeCafe', ['ngRoute'])
    .config(Router);

Router.$inject = ['$routeProvider'];

function Router($routeProvider) {
    //CONFIGURING ROUTES
    $routeProvider
        .when("/", {
            templateUrl: "/views/home.html"
        })
        .when("/contact", {
            templateUrl: "/views/contact.html"
        })
        .when("/about", {
            templateUrl: "/views/about.html"
        })
        .when("/register", {
            templateUrl: "/views/register.html"
        })
        .when("/menu", {
            templateUrl: "/views/menu.html"
        })
        .when("/reset/:token", {
            templateUrl: "/views/reset.html",
            controller: "coffeeCtrl"
        })
        .when("/profile", {
            templateUrl: "/views/profile.html"
        })
        .otherwise({
            redirectTo: "/"
        });
}
