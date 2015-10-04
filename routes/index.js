var express = require('express');
var router = express.Router();

// get page information
var jsonfile = require('jsonfile');
var index_info;
jsonfile.readFile('./my_dicts/index.json', function(err, obj) {
  index_info = obj;
  // console.log(obj);
})

/* GET users listing. */
// index page
router.get('/', function(req, res, next) {
  // get lang query
  var lang;
  if( req.query.hasOwnProperty('lang') ){
    lang = req.query.lang;
  }else{
    lang = 'english';
  }

  if( !index_info.hasOwnProperty(lang) ){
    lang = 'english';
  }

  // set page info
  var page_info = {
    title : index_info[lang]['title'],
    nav_home : index_info[lang]['nav_home'],
    nav_services : index_info[lang]['nav_services'],
    nav_about : index_info[lang]['nav_about'],
    nav_partners : index_info[lang]['nav_partners'],
    nav_contact : index_info[lang]['nav_contact'],
    nav_dropdwon_languages : index_info[lang]['nav_dropdwon_languages'],
    nav_dropdown_traditional_chinese : index_info[lang]['nav_dropdown_traditional_chinese'],
    nav_dropdown_english : index_info[lang]['nav_dropdown_english'],
    intro : index_info[lang]['intro'],
    footer_copyright : index_info[lang]['footer_copyright']
  };

  res.render('index-demo', page_info);
});

module.exports = router;
