angular.module('CoffeeCafe')
    .controller('coffeeCtrl', coffeeController);

coffeeController.$inject = ['coffeeFactory'];

function coffeeController(coffeeFactory) {
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
                console.log('Response is', responseData);
                coffee.menu = responseData.data;
                console.log(coffee.menu);
            }, function(err) {
                console.error('There was an err ', err);

            });
    };
    coffee.cafeMenu();
}
