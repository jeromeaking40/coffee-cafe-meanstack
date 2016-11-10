var User = require('../models/User'),
    bcrypt = require('bcryptjs'),
    sessions = require('client-sessions'),
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
                //SET THE SERVICE PROVIDER TO SEND EMAILS
                var smtpTransport = nodemailer.createTransport('SMTP', {
                    service: 'Yahoo',
                    auth: {
                        user: 'jeromeaking40',
                        pass: 'biglos40'
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'jeromeaking40@yahoo.com',
                    subject: 'CoffeeCafe Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' + 'Please click on the following link, or paste this into your browser to complete the process:\n\n' + 'http://' + req.headers.host + '/reset/' + token + '\n\n' + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function(error, res) {
                    if (error) {
                        console.log(error);
                    }
                    console.log(res);
                });
            }
        ]);
    },
    reset: function(req, res) {
        User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        }, function(err, user) {
            if (!user) {
                res.send('error', 'Password reset token is invalid or has expired.');
                return res.redirect('/forgot');
            }
            res.send('reset', {user: req.user});
        });
    },
    token: function(req, res) {
        sync.waterfall([
            function(done) {
                User.findOne({
                    resetPasswordToken: req.params.token,
                    resetPasswordExpires: {
                        $gt: Date.now()
                    }
                }, function(err, user) {
                    if (!user) {
                        res.send('error', 'Password reset token is invalid or has expired.');
                        return res.redirect('back');
                    }

                    user.password = req.body.password;
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;

                    user.save(function(err) {
                        req.logIn(user, function(err) {
                            done(err, user);
                        });
                    });
                });
            },
            function(user, done) {
                var smtpTransport = nodemailer.createTransport('SMTP', {
                    service: 'Yahoo',
                    auth: {
                        user: 'jeromeaking40',
                        pass: 'biglos40'
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'jeromeaking40@yahoo.com',
                    subject: 'Your password has been changed',
                    text: 'Hello,\n\n' + 'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    req.flash('success', 'Success! Your password has been changed.');
                    done(err);
                });
            }
        ], function(err) {
            res.redirect('/');
        });
    },
    middlewares: {
        session: function(req, res, next) {
            // MIDDLEWARE TO CHECK IF USER LOGGED IN
            if (req.session) {
                next();
            } else {
                res.redirect('/login.html');
            }
        }
    }
};
