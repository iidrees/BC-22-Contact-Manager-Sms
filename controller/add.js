// require body parser so you can get data through the req.body object and render it to dynamically render data to the page
var bodyParser = require('body-parser'); 


var firebase = require('../fire_base/firebase.js');
//var db = firebase.database();
//var ref = db.ref('contacts');
//var logRef = ref.child('logs');
//var fireAuth = firebase.auth();
//var contactsRef = ref.child('contact details');

//Connect to the database
var db = firebase.database();
var ref = db.ref('contacts');
//var addRef = ref.child('logs');
var fireAuth = firebase.auth();


var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

	// Add contacts to the db
app.post('/addcontacts', urlencodedParser, function(req, res) {
    var fullname = req.body.full_name;
    var email = req.body.email;
    var number = req.body.number;
    
    var contacts = {
        name: fullname, 
        email: email, 
        number: number, 
        timeStamp: new Date().toString()};
    //console.log(contacts);

    //var user = fireAuth.currentUser;
/*  if (user) {
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
    contactsRef.orderByKey().limitToLast(1).on('child_added', function(snap) {
        console.log('added', snap.val());
    });
    res.render('addcontacts');

})


}

