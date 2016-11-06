angular.module('CoffeeCafe')
    .controller('coffeeCtrl', coffeeController);

function coffeeController() {
    var coffee = this;
    coffee.greeting = 'Welcome to Coffee Cafe!';
    console.info('controller loaded');
}
