
var firebase = require("firebase");

  // Initialize Firebase
var config = {
apiKey: process.env.apiKey,
authDomain: process.env.authDomain,
databaseURL: process.env.databaseURL,
projectId: process.env.projectId,
storageBucket: process.env.storageBucket,
messagingSenderId: process.env.messagingSenderId
};
module.exports = firebase.initializeApp(config);

