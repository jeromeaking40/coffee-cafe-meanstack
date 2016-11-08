var Users = require('../controllers/users'),
    Menu = require('../menu/menu'),
    Auth = require('../controllers/auth'),
    express = require('express');


module.exports = function(app) {

    //GET MENU FROM SERVER
    app.get('/menu', function(req, res) {
        res.send(Menu);
    });

    //CREATE NEW USERS
    app.post('/register', Users.create);

    //LOGIN USERS
    app.post('/login', Auth.login);

    //LOGUT USERS
    app.get('/logout', Auth.logout);

    //ANYTHING BELOW THIS LINE IS PROTECTED WITH THE MIDDLEWARE
    app.use(Auth.middlewares.session);

    //PROFILE PAGE ONCE AUTHENICATED
    app.get('/profile', Auth.profile);

    //USER INFORMATION ONCE LOGGED IN
    app.get('/api/me', Auth.me);

    //Serve Static Files
    app.use(express.static('public'));

};
