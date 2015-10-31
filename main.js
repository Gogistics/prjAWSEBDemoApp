/* setting */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// dispatchers
var routes = require('./routes/index');
var users = require('./routes/users');
var services = require('./routes/services');

var tests = require('./routes/tests'); // for test only

// express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // set favicon
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist'))); // set bootstrap path
app.use('/jq', express.static(path.join(__dirname, '/node_modules/jquery/dist'))); // set jquery path
app.use('/handsontable', express.static(path.join(__dirname, '/bower_components/handsontable/dist'))); // set jquery path

// setting for flocking.js
app.use('/flocking_js', express.static(path.join(__dirname, '/bower_components/flocking/dist'))); // set jquery path
app.use('/test', express.static(path.join(__dirname, '/music_demo/drum-machine'))); // set jquery path

// setting for timbre
app.use('/timbre.js', express.static(path.join(__dirname, '/music_demo/timbre'))); // set jquery path

// geoip
app.use('/geoip', express.static(path.join(__dirname, '/my_geoip'))); // set jquery path


/* urls */
// dispatchers, or routers; forward requests to handlers
app.use('/', routes);
app.use('/users', users);
app.use('/test', tests);
app.use('/services', services);

/* error handler */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
