angular.module('module.login', []).controller('controller.login', [
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
                // DO NOT FORGET!!!! an error callback
                // when things go bad, you need this!!!!!!!!
                console.error(err);
            });
        };

        //RESET PASSWORD from PASSWORD LINK
        login.resetNewPassword = function() {
            console.log(login);
            $http({
                method: 'POST',
                url: '/reset/:token',
                data: {
                    email: login.email,
                    password: login.password
                }
            }).then(function(res) {
                console.info(res.data);
                location.href = '/#/reset';
            }, function(err) {
                // DO NOT FORGET!!!! an error callback
                // when things go bad, you need this!!!!!!!!
                console.error(err);
            });
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
                // DO NOT FORGET!!!! an error callback
                // when things go bad, you need this!!!!!!!!
                console.error(err);
            });

            login.email = "";
        };


    }
]);
