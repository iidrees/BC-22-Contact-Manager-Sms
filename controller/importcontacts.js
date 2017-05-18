// require body parser so you can get data through the req.body object and render it to dynamically render data to the page
var bodyParser = require('body-parser'); 
var fs = require('fs');
var firebase = require('../fire_base/firebase.js');
var db = firebase.database();
var contactRef = db.ref('contacts');
var addRef = contactRef.child('import_contact');
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

	// Import contacts
    app.post('/import', urlencodedParser, function(req, res) {
    var contactJson = req.body.file_name;
    console.log(contactJson);

    fs.readFile(contactJson, 'utf8', function(err,data){
        console.log(data);
        var contactStr = JSON.parse(data);
        console.log(contactStr.contacts.contact_details.new_one.name);
         
        var name1 = contactStr.contacts.contact_details.new_one.name;
        var name2 = contactStr.contacts.contact_details.new_two.name;
        var name3 = contactStr.contacts.contact_details.new_three.name;
        var name4 = contactStr.contacts.contact_details.new_four.name;
        var name5 = contactStr.contacts.contact_details.new_five.name;
        var name6 = contactStr.contacts.contact_details.new_six.name;
        var name7 = contactStr.contacts.contact_details.new_seven.name;
        var name8 = contactStr.contacts.contact_details.new_eight.name;

        var number1 = contactStr.contacts.contact_details.new_one.number;
        var number2 = contactStr.contacts.contact_details.new_two.number;
        var number3 = contactStr.contacts.contact_details.new_three.number;
        var number4 = contactStr.contacts.contact_details.new_four.number;
        var number5 = contactStr.contacts.contact_details.new_five.number;
        var number6 = contactStr.contacts.contact_details.new_six.number;
        var number7 = contactStr.contacts.contact_details.new_seven.number;
        var number8 = contactStr.contacts.contact_details.new_eight.number;
        console.log(name4, number4);

        var new_contact = {
            name_one: name1, 
            number_one: number1
            //name_two: name2,
            //number_two: number2
        };
        //var contactsRef = ref.child('contact details');
        var contactRef = addRef.push(new_contact);

        //addRef.child(contactRef.key).set(contacts);
        contactRef.orderByKey().limitToLast(1).on('child_added', function(snap) {
            console.log('added', snap.val());
        });

    })

    
    res.render('import');
})


}

