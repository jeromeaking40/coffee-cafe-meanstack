angular.module('module.login', [])
  .controller('controller.login', [
    '$http',
    function($http) {
        var login = this;

        //SEND USER PROFILE IF AUTHENICATED
        login.submit = function() {
            console.log(login);
            $http({
                method: 'POST',
                url: '/login',
                data: {
                    email: login.email,
                    password: login.password
                }
            }).then(function(res) {
                console.info(res.data);
                location.href = '/#/profile';
            }, function(err) {
                console.error(err);
                alertify.alert("CoffeeCafe", "Invalid user or password!");

            });
        };

        //RESET PASSWORD from PASSWORD LINK
        login.resetNewPassword = function() {
            $http({
                method: 'POST',
                url: '/reset/:token',
                data: {
                    email: login.email,
                    password: login.password
                }
            }).then(function(res) {
                console.info(res.data);
                location.href = '/reset';
            }, function(err) {
                console.error(err);
            });
            login.resetNewPassword();
        };

        //GET RESET PAGE
       login.passwordReset = function() {
           $http({
               method: 'POST',
               url: '/forgot',
               data: {
                   email: login.email
               }
           }).then(function(res) {
               console.info(res.data);
               location.href = '/#/forgot';
           }, function(err) {
               console.error(err);
           });

           login.email = "";
       };


    }
]);
