'use strict';
// require modules
var express = require('express');
var controller = require('./controller/contact.js'); 
var addContact = require('./controller/add.js');
var bodyParser = require('body-parser');
var firebase = require('./fire_base/firebase.js');

 
// 
let app = express();

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

app.listen(3000, () => {
	console.log('project server is up and running');
})