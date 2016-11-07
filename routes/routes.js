var Users = require('../controllers/users');
var Menu = require('../menu/menu');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.sendFile('index.html', {
            root: './public/html'
        });
    });

    //Get Menu from Server
    app.get('/menu', function(req, res) {
        res.send(Menu);
    });

    //Create New Users
    app.post('/register', Users.create);

};
