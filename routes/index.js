var express = require('express');
var router = express.Router();

// get page information
var jsonfile = require('jsonfile');
var index_info;
jsonfile.readFile('./my_dicts/index.json', function(err, obj) {
  index_info = obj;
  console.log(obj);
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  var lang;
  if( req.query.hasOwnProperty('lang') ){
    lang = req.query.lang;
  }else{
    lang = 'english';
  }

  if( !index_info.hasOwnProperty(lang) ){
    lang = 'english';
  }

  console.log(index_info[lang]['title']);
  res.render('index-demo', { title : index_info[lang]['title'] });
});

module.exports = router;
