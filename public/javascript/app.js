
var button = document.getElementById('btn');


button.onclick = checker;

function checker() {
	var fullname = document.getElementById('full_name').value;
	var email = document.getElementById('email').value;
	var number = document.getElementById('number').value;

	console.log(fullname, email, number);



}
