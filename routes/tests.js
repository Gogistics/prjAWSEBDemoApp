/* test handler */
var express = require('express');
var router = express.Router();

// mongodb operation
var mongoose = require('mongoose');
var db;

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

var standardGreeting = 'Hello MoneysEdge';
var greetingSchema = mongoose.Schema({
  sentence : String
});
var Greeting = mongoose.model('Greeting', greetingSchema);
db = mongoose.connect(dbPath).connection;
db.on('error', function(err) { console.log(err.message); });
db.once('open', function() {
  console.log("mongodb connection open");

  //
  	var greeting;
	  Greeting.find( function(err, greetings){
	  	console.log(greetings);
	   if( greetings !== undefined && greetings.length <= 0 ){     
	      greeting = new Greeting({ sentence: standardGreeting }); 
	      greeting.save();
	      console.log(greeting);
	    } 
	  });
	});
// db

/* GET home page. */
router.get('/', function(req, res, next) {
	Greeting.findOne(function (err, greeting) {
    // res.send(greeting.sentence);
    res.render('index', { title: 'Express: ' + greeting.sentence });
  });
});

module.exports = router;

