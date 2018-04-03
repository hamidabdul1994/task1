var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require("./config");
var routes = require('./routes/');
//Init DB
var model = require("./model").init();

var app = express();
var commonService = require("./services").commonService;


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(logger('dev'));

//Body parser is using only for api
app.use('/api/*',bodyParser.json());
app.use('/api/*',bodyParser.urlencoded({ extended: false }));



app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  var responseObj = commonService.response;
  responseObj.setStatus(false);
  responseObj.setMessage(err.message || err.msg || "Something bad happened try again");
  responseObj.setData();
  if(!config.isProduction)
    console.trace(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.send(responseObj);
});

module.exports = app;
