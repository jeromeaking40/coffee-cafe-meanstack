var User = require('../models/User');

function create(req, res) {
    var newDoc = new User(req.body);

    newDoc.save(function(err, doc) {
        if (err) {
            return res.send(err);
        }
        res.send(doc);
    });
}

module.exports = {
    create: create
};
