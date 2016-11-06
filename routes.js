module.exports = function(app) {
    // app.get('/', function(req, res, next) {
    //     res.send('Hello');
    // });

    app.get('/', function(req, res) {
        res.sendFile('index.html', {
            root: './public/html'
        });
    });

    app.post('/register', function(req, res) {
        if (req.body.email && req.body.name && req.body.password && req.body.confirmPassword) {
            //confirm that user typed same password twice
            if (req.body.password !== req.body.confirmPassword) {
                var err = new Error('Passwords do not match');
                err.status = 404;
                return next(err);
            }
            //create form with user input
            var userData = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            };
            console.log([req.body.email,
                req.body.name,
                req.body.password
            ]);
            //use schema's create method to insert document into mongoose
            User.create(userData, function(error, user) {
                if (error) {
                    return next(error);
                } else {
                    req.session.userId = user._id;
                    return res.redirect('/profile');
                }
            });
        } else {
            var err = new Error('All fields required.');
            err.status = 400;
            return next(err);
        }
    });

};
