var Users = require('../controllers/users');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.sendFile('index.html', {
            root: './public/html'
        });
    });


    app.get('/menu', function(req, res) {
        res.sendFile('menu.html', {
            root: './public/views'
        });
    });

    //Create New Users
    app.post('/register', Users.create);

};
