
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 30566);
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
        res.render('main.handlebars')
});

app.get('/students', function(req,res){
        res.render('students.handlebars')
});

app.get('/teachers', function(req,res){
  res.render('teachers.handlebars')
});

app.get('/courses', function(req,res){
        res.render('courses.handlebars')
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
