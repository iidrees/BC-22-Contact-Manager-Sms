
var firebase = require("firebase");

  // Initialize Firebase
var config = {
apiKey: "AIzaSyDnyB5FfLDrCOtB3fhNdcVsyesz-GtIv7I",
authDomain: "bc-22-contact-manager-sms.firebaseapp.com",
databaseURL: "https://bc-22-contact-manager-sms.firebaseio.com",
projectId: "bc-22-contact-manager-sms",
storageBucket: "bc-22-contact-manager-sms.appspot.com",
messagingSenderId: "974884069082"
};
module.exports = firebase.initializeApp(config);

