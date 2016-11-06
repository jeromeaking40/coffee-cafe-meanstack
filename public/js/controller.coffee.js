angular.module('CoffeeCafe')
    .controller('coffeeCtrl', coffeeController);

coffeeController.$inject = ['coffeeFactory'];

function coffeeController(coffeeFactory) {
    var coffee = this;
    coffee.greeting = 'Welcome to Coffee Cafe!';
    console.info('controller loaded');

    coffee.newUser = {};

    coffee.siteRegister = function() {
        coffeeFactory.createUser(coffee.newUser)
            .then(function(responseData) {
                console.log('Response is', responseData);
            }, function(err) {
                console.error('There was an err ', err);
            });

        //Resets the form
        coffee.newUser = {};

    };
}