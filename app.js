var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var db= require('./configure/db');

var kycRouter = require('./routes/Kycroute');
var collectionRouter = require('./routes/Createcollection');
var profileRouter = require('./routes/profileRoute');
var NftRouter = require('./routes/NftRoue');
var walletRouter = require('./routes/users');

var adminLogin = require('./adminRouts/adminLogin');
var changePassword = require('./adminRouts/adminLogin')
var forgotPassword = require('./adminRouts/adminLogin')


var app = express();
app.use(cors({
  origin:"*"
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit accordingly
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/nft-collection', collectionRouter);
app.use('/kyc', kycRouter);
app.use('/user', profileRouter);
app.use('/user', NftRouter);
app.use('/user', walletRouter);

//Admin Routes using
app.use('/', adminLogin);
app.use('/', changePassword);
app.use('/', forgotPassword);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
