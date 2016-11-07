angular.module('CoffeeCafe')
    .factory('coffeeFactory', coffeeFactory);

coffeeFactory.$inject = ['$http'];

function coffeeFactory($http) {
    return {
        //CREATE NEW USERS
        createUser: function(newUser) {
            console.log(newUser);
            return $http.post('/register', newUser);
        },
        //GET MENU INFO
        getMenu: function() {
            return $http.get('/menu');
        }
    };
}
