require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var usersRouter = require('./routes/users');

var app = express();

//db connection
const url = process.env.MONGO_URL;
mongoose.connect(url, {
  useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true,
});

const { connection } = mongoose;
connection.once('open', () => {
  console.log('Database Connected');
}).catch(() => {
  console.log('connection failed');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session store
const mongostore = new MongoStore({
  mongooseConnection: connection,
  collection: 'sessions',
});

//session config
app.use('/', session({
  name: 'StockCookie',
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: mongostore,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));

app.use('/', usersRouter);

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
