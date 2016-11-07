angular.module('CoffeeCafe', ['ngRoute'])
    .config(Router);

Router.$inject = ['$routeProvider'];

function Router($routeProvider) {
    //CONFIGURING Routes
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
        .otherwise({
            redirectTo: "/"
        });
}
