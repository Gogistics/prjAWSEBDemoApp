var express = require('express');
var router = express.Router();

// get page information
var jsonfile = require('jsonfile');
jsonfile.readFile('./my_dicts/index.json', function(err, obj) {
  console.log(obj);
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index-demo', { title: 'Express' });
});

module.exports = router;
