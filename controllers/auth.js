var User = require('../models/User'),
    bcrypt = require('bcryptjs');

//Auth Routes
module.exports = {
    login: function(req, res) { // POST login
        console.info('LOGIN::POST::PAYLOAD::', req.body);

        User.findOne({
            email: req.body.email
        }, function(err, user) {
            if (err) { // this will trigger the error .then callback on the frontend
                console.error('MongoDB error:', err);
                res.status(500).json(err);
            }
            if (!user) {
                console.warn('No user found!');
                res.status(403).json({
                    message: 'Invalid username or password'
                });
            } else {
                console.info('auth.login', user);

                bcrypt.compare(req.body.password, user.password, function(compareErr, matched) {
                    if (compareErr) { // this will trigger the error .then callback on the frontend
                        console.error('compareErr error:', compareErr);
                        res.status(500).json(err);
                    } else if (!matched) {
                        console.warn('Password mismatch!');
                        res.status(403).json({
                            message: 'Invalid username or password'
                        });
                    } else {
                        req.session.userId = user._id;
                        res.send({
                            message: 'Login success!'
                        });
                        // res.redirect('/profile');
                    }
                });
            }

        });
    },

    profile: function(req, res) {
        res.sendFile('/profile');
    },
    logout: function(req, res) {
        req.session.reset();
        res.redirect('/login.html');
    },
    register: function(req, res) {
        console.log(req.body);

        var newUser = new User(req.body);

        // when this function fires, it is going to hit the pre save middleware
        newUser.save(function(err, user) {
            if (err) {
                return res.send(err);
            }
            res.send(user);
        });
    },
    middlewares: {
        session: function(req, res, next) { // this will be the middleware that checks for a loggedin user
            if (req.session.userId) {
                next();
            } else {
                res.redirect('/login.html');
            }
        }
    }
};
