var bodyParser = require('body-parser'); // require body parser so you can get data through the req.body object and render it.
//to dynamically render data to the page

var firebase = require('../fire_base/firebase.js');
var db = firebase.database();
var ref = db.ref();

//Connect to the database


// var ref = firebase.database().ref().child('node-client');
    var logsRef = ref.child('logs');
    var messagesRef = ref.child('messages');
    var message = {text: 'hey guys', timeStamp: new Date().toString()};
    var messageRef = messagesRef.push(message);

    logsRef.child(messageRef.key).set(message);
    logsRef.orderByKey().limitToLast(1).on('child_added', function(snap) {
        console.log('added', snap.val());
    });



var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

	// User creation and Authentication
app.post('/register', urlencodedParser, function(req, res) {
	var full_name = req.body.full_name;
	var email = req.body.email;
	var password = req.body.password;
	console.log(email, password);
	firebase.auth().createUserWithEmailAndPassword(email,password)
	     .then((user) => {
            let userId = user.uid;
            let userRef = ref.child('users/' + userId);
            
            return userRef.set({
                userId,
                full_name,
                email,
                password
            });
        })
	    .then(res.redirect('home'))
	    .catch((err) => {
           let errorCode = err.code;
           let errorMessage = err.message;
           console.log(err);
           res.redirect('register')
	     
	});
});

app.post('/register', urlencodedParser, function(req, res) {
	var full_name = req.body.full_name;
    var email = req.body.eMail;
    var password = req.body.passWord;
    console.log(full_name, email, password);

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(user) {
            res.redirect('home');
        })
        .catch( function(err) {
            let errorCode = err.code;
            let errorMessage = err.message;
            return res.render('register', {error: errorMessage});
        });  
})

app.get('/signOut', function(req,res) {
	firebase.auth().signOut()
        .then(function(){
            res.redirect('/register');
        })
        .catch( function(err) {
            let errorCode = err.code;
            let errorMessage = err.message;
            return res.render('register', {error: errorMessage});
        });
})


	// Add contacts to the db
app.post('/addcontacts', urlencodedParser, function(req, res) {
	var fullname = req.body.full_name;
	var email = req.body.email;
	var number = req.body.number;

})




}


/*
app.post('/todo/:item', function(req, res) {
	//delete the requested item from mongodb
	Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
		if (err) throw err;
		res.json(data);
	})*//*
	data = data.filter(function(todo) {
		return todo.item.replace(/ /g, '-') !== req.params.item;
	});


});*/
