module.exports = function(app) {
    // app.get('/', function(req, res, next) {
    //     res.send('Hello');
    // });

    app.get('/', function(req, res) {
        res.sendFile('index.html', {
            root: './public/html'
        });
    });
};
