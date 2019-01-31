var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const userTable = require('./model/user')
var session = require('express-session')
var flash = require('flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({ secret: 'neX^pAy%Mid$Ware', saveUninitialized: true, resave: true }))

// ================================   for passport  =================================
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());       
app.use(passport.session());    
app.use(flash())  

passport.serializeUser(function(userTable, done) {
  done(null, userTable.id);
});

passport.deserializeUser(function(id, done) {
  userTable.findById(id).then((userTableObj)=>{
    done(null,userTableObj)
  }).catch((err)=>{
    done(err,false)
  })
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    userTable.findOne({
        where:{
          username:username,
        }
    }).then((response)=>{
        if(!response)
        {
          done(null, false, {message:'Incorrect username'})
          console.log('incorrect username')
        } 
        else if(!response.validatePassword(password)) {
          done(null, false, {message:'Incorrect password'}) 
          console.log('incorrect password')
                       
        }
        else
        {
          done(null, response)
        }
    })    
  }
));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',require('./routes/login'))
app.use('/product',require('./routes/product'))


app.get('/logout',(req,res)=>{
  req.logout()
  res.redirect('/')
})



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
