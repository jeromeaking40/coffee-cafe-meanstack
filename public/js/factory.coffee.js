angular.module('CoffeeCafe')
    .factory('coffeeFactory', coffeeFactory);

coffeeFactory.$inject = ['$http'];

function coffeeFactory($http) {
    return {
        createUser: function(newUser) {
            console.log(newUser);
            return $http.post('/register', newUser);
        }
    };
}
