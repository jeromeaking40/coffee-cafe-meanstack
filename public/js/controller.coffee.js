angular.module('CoffeeCafe').controller('coffeeCtrl', coffeeController);

coffeeController.$inject = ['coffeeFactory', '$http', '$routeParams'];

function coffeeController(coffeeFactory, $http, $routeParams) {
    var coffee = this;
    coffee.greeting = 'Welcome to Coffee Cafe!';
    console.info('controller loaded');

    coffee.newUser = {};

    //CREATE NEW USER
    coffee.siteRegister = function() {
        coffeeFactory.createUser(coffee.newUser).then(function(responseData) {
          alertify.alert("CoffeeCafe", "Successfully created account, Welcome to the Club!");
        }, function(err) {
            console.error('There was an err ', err);
        });
        //RESETS THE FORM
        coffee.newUser = {};
    };

    //GET MENU INFORMATION
    coffee.cafeMenu = function() {
        coffeeFactory.getMenu().then(function(responseData) {
            coffee.menu = responseData.data;
        }, function(err) {
            console.error('There was an err ', err);

        });
    };

    //GET INFORMATION ONCE USER LOGS IN
    coffee.info = function() {
        $http({method: 'GET', url: '/api/me'}).then(function(res) {
            coffee.profile = res.data;
            if (res.data._id) {
                coffee.signedIn = true;
            } else {
                coffee.signedIn = false;
            }
        }, function(err) {
            // DO NOT FORGET!!!! an error callback
            console.error(err);
        });
    };

    //API CALL TO GET MENU
    coffee.cafeMenu();
}
