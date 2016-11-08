var Users = require('../controllers/users'),
    Menu = require('../menu/menu'),
    Auth = require('../controllers/auth'),
    express = require('express');


module.exports = function(app) {
    //Get Menu from Server
    app.get('/menu', function(req, res) {
        res.send(Menu);
    });

    //Create New Users
    app.post('/register', Users.create);

    //Login Users
    app.post('/login', Auth.login);

    // anythin below line 14 is protected
    app.use(Auth.middlewares.session);

    app.get('/profile');

    //Serve Static Files
    app.use(express.static('public'));

};
