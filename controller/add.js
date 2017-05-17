var bodyParser = require('body-parser'); // require body parser so you can get data through the req.body object and render it.
//to dynamically render data to the page

var firebase = require('../fire_base/firebase.js');
//var db = firebase.database();
//var ref = db.ref('contacts');
//var logRef = ref.child('logs');
var fireAuth = firebase.auth();
//var contactsRef = ref.child('contact details');

//Connect to the database



var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

	// Add contacts to the db
app.post('/addcontacts', urlencodedParser, function(req, res) {
    var fullname = req.body.full_name;
    var email = req.body.email;
    var number = req.body.number;
    console.log(fullname, email, number);
   

	
    /*var db = firebase.database();
    var ref = db.ref('contacts');
    var logRef = ref.child('logs');
    var fireAuth = firebase.auth();
	var contacts = {name: fullname, email: email, number: number, timeStamp: new Date().toString()};
    var contactsRef = ref.child('contact details');
    var contactRef = contactsRef.push(contacts);

    logRef.child(contactRef.key).set(contacts);
    logRef.orderByKey().limitToLAst(1).on('child_added', function(snap) {
        console.log('added', snap.val());
    });
    res.render('addcontacts');*/
})



}

