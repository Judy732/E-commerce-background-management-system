var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var managerRouter = require('./routes/api/loginApi')
var userRouter = require('./routes/api/userApi')
var reportRouter1 = require('./routes/api/reportApi')
var orderRouter = require('./routes/api/orderApi')
var powerRouter = require('./routes/api/powerApi')
var goodsRouter = require('./routes/api/goodsApi')
var categoryRouter = require('./routes/api/categoryApi')
var attributeRouter = require('./routes/api/attributeApi')
var rolesRouter = require('./routes/api/roleApi')
var forgetRouter = require('./routes/api/forget')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api',managerRouter)
app.use('/users',userRouter)
app.use('/report',reportRouter1)
app.use('/orders',orderRouter)
app.use('/power',powerRouter)
app.use('/goods',goodsRouter)
app.use('/cate',categoryRouter)
app.use('/attr',attributeRouter)
app.use('/role',rolesRouter)
app.use('/forget',forgetRouter)

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
