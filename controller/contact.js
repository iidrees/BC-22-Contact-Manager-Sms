// require body parser so you can get data through the req.body object and render it.
var bodyParser = require('body-parser'); 

//Connect to the database
var firebase = require('../fire_base/firebase.js');
var db = firebase.database();
var ref = db.ref();




var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

	// User creation and Authentication
app.post('/register', urlencodedParser, function(req, res) {
	var full_name = req.body.full_name;
	var email = req.body.email;
	var password = req.body.password;
	console.log(email, password);
	firebase.auth().createUserWithEmailAndPassword(email,password)
	     .then(function(user) {
            var userId = user.uid;
            var userRef = ref.child('users/' + userId);
            
            return userRef.set({
                userId,
                full_name,
                email,
                password
            });
        })
	    .then(res.redirect('home'))
	    .catch( function(err) {
           var errorCode = err.code;
           var errorMessage = err.message;
           console.log(err);
           res.redirect('register')
	     
	});
});

app.post('/home', urlencodedParser, function(req, res) {
	var full_name = req.body.full_name;
    var email = req.body.eMail;
    var password = req.body.passWord;
    console.log(full_name, email, password);

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(user) {
            res.redirect('home');
        })
        .catch( function(err) {
            var errorCode = err.code;
            var errorMessage = err.message;
            return res.render('register', {error: errorMessage});
        });  
})

app.get('/signOut', function(req,res) {
	firebase.auth().signOut()
        .then(function(){
            res.redirect('/register');
        })
        .catch( function(err) {
            var errorCode = err.code;
            var errorMessage = err.message;
            return res.render('register', {error: errorMessage});
        });
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
