var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    // the larger this value is, the stronger the encryption,
    // but the longer it will take to compare hashes;
    SALT_INDEX = 10;

//SET UP MongoDB Schema
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});


//Mongo Prehook!
UserSchema.pre('save', function(next) {
    var user = this; // new User(req.body);

    // user.email = user.email.toLowerCase();

    // only hash the password if modified or a new user
    if (!user.isModified('password')) {
        return next();
    }

    // generate a salt value to encrypt our password
    bcrypt.genSalt(SALT_INDEX, function(saltErr, salt) {
        if (saltErr) {
            console.error(saltErr);
            return next(saltErr);
        }
        console.info('SALT GENERATED', salt);

        // hashing this bad boy!
        bcrypt.hash(user.password, salt, function(hashErr, hashedPassword) {
            if (hashErr) {
                console.error(hashErr);
                return next(hashErr);
            }
            // override the plain text password with the hashed one.
            user.password = hashedPassword;
            next();
        });
    });
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
