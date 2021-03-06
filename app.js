if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const apiRouter = require('./routes/api/index')
const bodyParser = require('body-parser')

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI);
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//enable cross site scripting
app.use(cors())

//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send('Not found').status(404)
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
