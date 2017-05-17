'use strict';
// require modules
var express = require('express');
var controller = require('./controller/contact.js'); 
var addContact = require('./controller/add.js');
var bodyParser = require('body-parser');
var firebase = require('./fire_base/firebase.js');
var db = firebase.database();
var ref = db.ref('contacts');
var addRef = ref.child('logs');
var fireAuth = firebase.auth();

 
// 
var app = express();

// set the port of our application

//process.env.PORT lets the port be set by heroku

var port = process.env.PORT || 9090;

//set up the template engine
app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

//Fire controllers

controller(app);
//addContact(app);

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
app.post('/addcontacts', urlencodedParser, function(req, res) {
	var fullname = req.body.full_name;
	var email = req.body.email;
	var number = req.body.number;
	
	var contacts = {name: fullname, email: email, number: number, timeStamp: new Date().toString()};
	//console.log(contacts);

	//var user = fireAuth.currentUser;
/*	if (user) {
		userId = user.uid;

	//addRef.child('/' + userId).push(contacts).then(res.redirect('/addcontacts'))
	     .catch(function(err) {
                var errorCode = err.code;
                var errorMessage = err.message;
                return res.render('/register', {error: errorMessage});
            });


	}*/

	
    var contactsRef = ref.child('contact details');
    var contactRef = contactsRef.push(contacts);

    //addRef.child(contactRef.key).set(contacts);
    addRef.orderByKey().limitToLast(1).on('child_added', function(snap) {
        console.log('added', snap.val());
    });
    res.render('addcontacts');

})

// static files 
app.use(express.static('./public'));

app.listen(port, function() {
	console.log('project server is up and running on http://localhost: ' + port);
});