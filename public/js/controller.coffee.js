angular.module('CoffeeCafe')
    .controller('coffeeCtrl', coffeeController);

coffeeController.$inject = ['coffeeFactory', '$http'];

function coffeeController(coffeeFactory, $http) {
    var coffee = this;
    coffee.greeting = 'Welcome to Coffee Cafe!';
    console.info('controller loaded');

    coffee.newUser = {};

    //CREATE NEW USER
    coffee.siteRegister = function() {
        coffeeFactory.createUser(coffee.newUser)
            .then(function(responseData) {
                console.log('Response is', responseData);
            }, function(err) {
                console.error('There was an err ', err);
            });
        //RESETS THE FORM
        coffee.newUser = {};
    };

    //GET MENU INFORMATION
    coffee.cafeMenu = function() {
        coffeeFactory.getMenu()
            .then(function(responseData) {

                coffee.menu = responseData.data;
            }, function(err) {
                console.error('There was an err ', err);

            });
    };

    //GET INFORMATION ONCE USER LOGS IN
    coffee.info = function() {

        $http({
            method: 'GET',
            url: '/api/me'
        }).then(function(res) {
            coffee.profile = res.data;
        }, function(err) {
            // DO NOT FORGET!!!! an error callback
            // when things go bad, you need this!!!!!!!!
            console.error(err);
        });
    };

    coffee.cafeMenu();
}
