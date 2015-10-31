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
    console.log("mongodb connection open by mongoose");
  	var greeting;
	  Greeting.find( function(err, greetings){
	  	// console.log(greetings);
	   if( greetings !== undefined && greetings.length <= 0 ){     
	      greeting = new Greeting({ sentence: standardGreeting }); 
	      greeting.save();
	      // console.log(greeting);
	    } 
	  });
	});
// end of db

// geoip
var geoip = require('geoip-lite');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('music_demo_beatbox', {});
});

// Flocking
router.get('/music_demo_drum', function(req, res, next) {
  res.render('music_demo_drum', {});
});

// timbre
router.get('/music_demo_beatbox', function(req, res, next){
  res.render('music_demo_beatbox', {});
});

// geoip
router.get('/get_ip_geo', function(req, res, next){
  // send res
  res.render('ip_geo', {});
});

// pass query result
router.post('/get_ip_geo', function(req, res, next){
  // send res
  var ip = req.body['ip'], token = req.body['token'], geo = 'NA', update_status = {};
  if(token === 'dWEF43tHwFfgG51ASeFg5087rtRBR'){
    //
    geo = geoip.lookup(ip);
    update_status['geo'] = geo;
    update_status['req_status'] = true;
  }else{
    update_status['req_status'] = false;
  }
  res.json(update_status);
});

module.exports = router;

