/* services */
var express = require('express');
var router = express.Router();

// mandrill email service
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('Mve9Ww6fxCoLOGitjaQmZQ');
mandrill_client.users.info({}, function(result) {
    // console.log(result);
}, function(e) {
    // Mandrill returns the error as an object with name and message keys
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
});

/* mongodb operation */
// mongoose
// var mongoose = require('mongoose');
// var config = {
//   'USER': '',
//   'PASS': '',
//   'HOST': 'ec2-54-200-66-54.us-west-2.compute.amazonaws.com',
//   'PORT': '27017',
//   'DATABASE': 'moneysedge'
// };
// var dbPath = 'mongodb://' + 
//             config.HOST + '/' +
//             config.DATABASE;

// var db = mongoose.connect(dbPath).connection;
// db.on('error', function(err) { console.log(err.message); });

// monk
var monk = require('monk');
var config = {
  HOST : 'ec2-54-200-66-54.us-west-2.compute.amazonaws.com',
  DB : 'moneysedge'
};
var db_path = config.HOST + '/' + config.DB;
var db = monk(db_path);
var init_demo_data_set = function(){
  // insert function
  var demo_data = db.get('demo_data');
  var insert_data_if_not_exist = function(arg_docs, arg_collection){
    if(arg_docs.length === 0){
      var finance_data = [
        ["239.65","24/02/2015","0.000128","-0.2379","47.044"],
        ["238.99","24/02/2015","0.0106","-0.2435","5.11"],
        ["231.26","24/02/2015","0.0066","-0.2521","7.571"],
        ["239.12","24/02/2015","0.0082","-0.2454","16.429"],
        ["255.07","24/02/2015","0.0091","-0.2017","252"],
        ["238.91","24/02/2015","0.0077","-0.2437","995"],
        ["211.51","24/02/2015","0.0089","-0.1880","4.28"],
        ["210.65","24/02/2015","0.0078","-0.1930","2.521"],
        ["205.06","24/02/2015","0.0107","-0.2251","96"],
        ["212.41","24/02/2015","0.0085","-0.1949","456"],
        ["227.94","24/02/2015","0.0158","-0.1363","49"],
        ["211.28","24/02/2015","0.0078","-0.1765","19"],
        ["1486.97","24/02/2015","0.0112","-0.2310","168"],
        ["1310.00","24/02/2015","-0.01812","-0.3310","0"],
        ["1497.50","24/02/2015","0.0051","-0.2309","160"]
      ];
      arg_collection.insert({ index_data : finance_data }, function(err, doc){
        if(err){
          throw err;
        }else{
          console.log(doc);
        }
      });
    }
  };

  demo_data.find({}, function(err, docs){
    if(err){
      throw err;
    }else{
      // insert data if not exist
      insert_data_if_not_exist(docs, demo_data);
    }
  });
};

// init data
init_demo_data_set();

// retrive data from mongodb and pass to fornt-end
router.post('/get_demo_data', function(req, res, next){
  var demo_data = db.get('demo_data');
  var finance_data = demo_data.findById('56117ea936bdfc9b1275df18', function(err, doc){
    if(err){
      throw err;
    }else{
      console.log(doc);
      var res_info = {
        req_status : true,
        index_data : doc['index_data']
      };
      res.json(res_info);
    }
  });
});

router.post('/update_demo_data_of_index_page', function(req, res, next){
  // get req info
  var updated_demo_data = req.body.updated_demo_data;

  //
  var demo_data = db.get('demo_data');
  demo_data.updateById('56117ea936bdfc9b1275df18', updated_demo_data, function(err, doc){
    //
    if(err){
      throw err;
    }else{
      console.log(doc);
    }
  });
});

/* GET users listing. */
router.post('/send_email', function(req, res, next) {
  // get req info
  console.log(req.body);

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
