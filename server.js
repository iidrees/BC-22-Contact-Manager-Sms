'use strict';
// require modules
var express = require('express');
var fs = require('fs');
var dotenv = require('dotenv').config()
var userSignin = require('./controller/contact.js'); 
var addContact = require('./controller/add.js');
var importContact = require('./controller/importcontacts.js');
var bodyParser = require('body-parser');
var firebase = require('./fire_base/firebase.js');
var db = firebase.database();
var contactRef = db.ref('contacts');
var addRef = contactRef.child('import_contact');
//addRef.on('value', getData, errData);
var fireAuth = firebase.auth();

 
// Start our express application
var app = express();

// set the port of our application
//process.env.PORT lets the port be set by heroku
var port = process.env.PORT;

//set up the template engine
app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

// run controllers
userSignin(app);
addContact(app);
importContact(app);

// routers
app.get('/', function(req, res) {
	res.render('register');
})

app.get('/register', function(req, res) {
	res.render('register');
})


app.get('/home', function(req, res) {
	res.render('home');
})

app.get('/import', function(req, res) {
	res.render('import');
})

app.get('/addcontacts', function(req, res) {
	res.render('addcontacts');
})


// static files 
app.use(express.static('./public'));

app.listen(port, function() {
	console.log('project server is up and running on http://localhost: ' + port);
});