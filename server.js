'use strict';
// require modules
var express = require('express');
var controller = require('./controller/contact.js'); 
var addContact = require('./controller/add.js');
var bodyParser = require('body-parser');
var firebase = require('./fire_base/firebase.js');

 
// 
let app = express();

// set the port of our application

//process.env.PORT lets the port be set by heroku

var port = process.env.PORT || 9090;

//set up the template engine
app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false});



app.post('/addcontacts', urlencodedParser, function(req, res) {
	

})

controller(app);
addContact(app);

// testing my middleware

app.get('/', function(req, res) {
	res.render('register');
})

app.get('/register', function(req, res) {
	res.render('register');
})

app.get('/home', function(req, res) {
	res.render('home');
})

app.get('/addcontacts', function(req, res) {
	res.render('addcontacts');
})

// static files 
app.use(express.static('./public'));

app.listen(port, function() {
	console.log('project server is up and running on http://localhost: ' + port);
});