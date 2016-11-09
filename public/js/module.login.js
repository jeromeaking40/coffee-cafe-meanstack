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

    login.loggedIn = false;

    login.isLoggedIn = function() {
      $http.get('/checklogin')
        .success(function(data) {
          console.log(data);
          if (data === true)
            login.loggedIn = true;
          else
            login.loggedIn = false;
        })
        .error(function(data) {
          console.log('error: ' + data);
        });
    };
      

    }
]);
