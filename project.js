var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 30566);
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('home')
});

app.get('/students', function(req, res) {
    res.render('students')
});

app.get('/professors', function(req, res) {
    res.render('professors')
});

app.get('/classes', function(req, res) {
    res.render('classes')
});

app.get('/majors', function(req, res) {
    res.render('majors')
});

app.get('/enrollments', function(req, res) {
    res.render('enrollments')
});



app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});