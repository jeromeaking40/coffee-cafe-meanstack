var User = require('../models/User'),
    bcrypt = require('bcryptjs'),
    sessions = require('client-sessions'),
    flash = require('connect-flash'),
    async = require('async'),
    crypto = require('crypto'),
    nodemailer = require('nodemailer');

//AUTH ROUTES
module.exports = {
    login: function(req, res) {
        // POST login
        console.info('LOGIN::POST::PAYLOAD::', req.body);
        User.findOne({
            email: req.body.email
        }, function(err, user) {
            if (err) {
                // this will trigger the error .then callback on the frontend
                console.error('MongoDB error:', err);
                res.status(500).json(err);
            }
            if (!user) {
                console.warn('No user found!');
                req.flash('logininMessage', 'No user found!');
                res.status(403).json({message: 'Invalid username or password'});
            } else {
                console.info('auth.login', user);

                bcrypt.compare(req.body.password, user.password, function(compareErr, matched) {
                    if (compareErr) { // this will trigger the error .then callback on the frontend
                        console.error('compareErr error:', compareErr);
                        res.status(500).json(err);
                    } else if (!matched) {
                        console.warn('Password mismatch!');
                        res.status(403).json({message: 'Invalid username or password'});
                    } else {
                        req.session = user;
                        res.send({message: 'Login success!'});
                        // res.redirect('/profile');
                    }
                });
            }

        });
    },
    profile: function(req, res) {
        res.sendFile('/profile.html', {root: "./public/views"});
    },
    logout: function(req, res) {
        req.session.reset();
        res.redirect('/views/login.html');
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
    me: function(req, res) {
        res.json(req.session);
    },
    checklogin: function(req, res) {
        if (req.user) {
            res.send(true);
        } else {
            res.send(false);
        }
    },
    forgot: function(req, res) {
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                User.findOne({
                    email: req.body.email
                }, function(err, user) {
                    if (!user) {
                        res.send('error', 'No account with that email address exists.');
                        return res.redirect('/views/forgot.html');
                    }
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                    user.save(function(err) {
                        done(err, token, user);
                    });
                });
            },
            function(token, user, done) {
                var smtpTransport = nodemailer.createTransport('SMTP', {
                    service: 'SendGrid',
                    auth: {
                        user: 'loshorse',
                        pass: 'biglos40'
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'jeromeaking40@yahoo.com',
                    subject: 'CoffeeCafe Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' + 'Please click on the following link, or paste this into your browser to complete the process:\n\n' + 'http://' + req.headers.host + '/reset/' + token + '\n\n' + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function(error, response) {
                    if (error) {
                       console.log(error);
                    }
                    console.log('Message sent: ' + response.message);
                });
            }
        ]);
    },
    middlewares: {
        session: function(req, res, next) {
            // this will be the middleware that checks for a loggedin user
            if (req.session) {
                next();
            } else {
                res.redirect('/login.html');
            }
        }
    }
};
