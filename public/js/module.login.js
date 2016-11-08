angular.module('module.login', [])
.controller('controller.login', ['$http',
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

        //GET INFORMATION ONCE USER LOGS IN
        login.info = function() {
            console.log(login);
            $http({
                method: 'GET',
                url: '/api/me',
                data: {
                    email: login.email
                }
            }).then(function(res) {
                console.info(res.data);
                login.profile = res.data;
            }, function(err) {
                // DO NOT FORGET!!!! an error callback
                // when things go bad, you need this!!!!!!!!
                console.error(err);
            });
        };

    }
]);
