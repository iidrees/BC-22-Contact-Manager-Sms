'use strict';
// require express
const express = require('express');

// 
let app = express();

//set up the template engine
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
	res.render('pages/signuplogin');
})


// static files 
app.use(express.static('./public'));

app.listen(3000, () => {
	console.log('project server is up and running');
})