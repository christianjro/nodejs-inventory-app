if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env' })
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var genresRouter = require('./routes/genres');
var artistsRouter = require('./routes/artists');
var albumsRouter = require('./routes/albums');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('MongoDB Connected...')
  })
  .catch(err => console.log(err))

app.use('/', indexRouter);
app.use('/genres', genresRouter);
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);

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

