var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    bcrpyt = require('bcrpyt'),
    Routes = require('./routes');

var app = express();

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}), bodyParser.json());

//Bring in routes
Routes(app);

//Set Mongoose Connection
mongoose.connect('mongodb://localhost/coffeeclub');

//Serve Static Files
app.use(express.static(__dirname + '/public'));

//Server
app.listen(3000, function(err, req, res) {
    if (err) {
        console.error('There was an error: ', err);
        process.exit(1);
    }
    console.log('Server is running on port 3000');
});
