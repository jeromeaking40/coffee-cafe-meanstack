angular.module('CoffeeCafe')
    .controller('coffeeCtrl', coffeeController);

coffeeController.$inject = ['$http'];

function coffeeController($http) {
    var coffee = this;
    coffee.greeting = 'Welcome to Coffee Cafe!';
    console.info('controller loaded');

    function siteRegister() {
        $http.post('/register')
            .then(function(response) {
                console.log('Response is', response);
            });
    }
}
