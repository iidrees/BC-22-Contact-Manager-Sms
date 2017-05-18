'use strict';
// require modules
var express = require('express');
var fs = require('fs');
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

 
// 
var app = express();

// set the port of our application

//process.env.PORT lets the port be set by heroku

var port = process.env.PORT || 9090;

//set up the template engine
app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

//Fire controllers

userSignin(app);
addContact(app);
importContact(app);




/*function getData(data) {
	//console.log(data.val());
	var numbers = data.val();
	var keys = Object.keys(numbers);
	//console.log(keys);
	for (var i = 0; i < keys.length; i++) {
		var k = keys[i];
		var name = numbers[k].name;
		var number = numbers[k].number;
	    //console.log(name, number); 
	}
	return (name, number); 
}
function errData(err) {
	console.log('Error!');
	console.log(err);
}

//var details = getData();
app.get('/home', urlencodedParser, function(req, res) {
	var detail;
	addRef.on('value', function(data){
		 detail = data.val();
		 var keys = Object.keys(detail);
		//console.log(detail)
		console.log(keys);
		var newName = [];
		var newNumber = []; 
		for (var i = 0; i < keys.length; i++) {
			var k = keys[i];
			var name = detail[k].name;
			var number = detail[k].number;
		    //console.log(name, number);
		    newNumber.push(name,number);
		    //newName.push(name);
	}
	console.log(newName, newNumber);
		//var name = detail.
		res.render('home', {detail: newNumber});
	})
    
	res.render('home', {detail: detail});



})*/

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