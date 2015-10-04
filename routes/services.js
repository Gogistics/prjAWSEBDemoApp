/* services */
var express = require('express');
var router = express.Router();

// mandrill email service
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('Mve9Ww6fxCoLOGitjaQmZQ');
mandrill_client.users.info({}, function(result) {
    console.log(result);
}, function(e) {
    // Mandrill returns the error as an object with name and message keys
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
});

// mongodb
var mongoose = require('mongoose');
var config = {
  'USER': '',
  'PASS': '',
  'HOST': 'ec2-54-200-66-54.us-west-2.compute.amazonaws.com',
  'PORT': '27017',
  'DATABASE': 'moneysedge'
};
var dbPath = 'mongodb://' + 
            config.HOST + '/' +
            config.DATABASE;

var db = mongoose.connect(dbPath).connection;
db.on('error', function(err) { console.log(err.message); });


/* GET users listing. */
router.post('/send_email', function(req, res, next) {
  // create a variable for the API call parameters
  var params = {
      "message": {
          "from_email":"gogistics@gogistics-tw.com",
          "to":[{"email":"invisible_alan@hotmail.com"}],
          "subject": "Sending a text email from the Mandrill API",
          "text": "I'm learning the Mandrill API at Codecademy."
      }
  };

  // send email
  mandrill_client.messages.send(params, function(res){
    console.log(res);
  }, function(err){
    console.log(err);
  });

  res.send({
              email_status : 'successful',
              msg : 'Thank you for contacting us.'
           });
});

module.exports = router;
