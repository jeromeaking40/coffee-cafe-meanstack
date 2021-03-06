var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    nodemailer = require('nodemailer'),
    async = require('async'),
    bcrypt = require('bcryptjs'),
    crypto = require('crypto'),
    colors = require('colors'),
    Routes = require('./routes/routes.js'),
    sessions = require('client-sessions')({
        cookieName: "coffeeclub-session", // front-end cookie name, currently pulled from package.json, feel free to change
        secret: 'DR@G0N$', // the encryption password : keep this safe
        requestKey: 'session', // req.session,
        duration: (86400 * 1000) * 7, // one week in milliseconds
        cookie: {
            ephemeral: false, // when true, cookie expires when browser is closed
            httpOnly: true, // when true, the cookie is not accesbile via front-end JavaScript
            secure: false // when true, cookie will only be read when sent over HTTPS
        }
    });
// encrypted cookies!

var app = express();

//Middleware
app.use(morgan('dev'));
app.use(sessions);
app.use(bodyParser.urlencoded({extended: true}), bodyParser.json());

//Set Mongoose Connection
mongoose.connect('mongodb://127.0.0.1/coffeeclub');

//Bring in routes
Routes(app);

//Server
app.listen(4000, function(err, req, res) {
    if (err) {
        console.error('There was an error: ', err);
        process.exit(1);
    }
    console.log('Server is running on port 4000');
});
