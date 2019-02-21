const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');

// CORS
const cors = require('cors');

// Dishes routes
const dishes = require('./app/routes/dish.routes.js');

// Orders routes
const orders = require('./app/routes/order.routes.js');

// Auth routes
const auth = require('./app/routes/auth');

mongoose.connect('mongodb://127.0.0.1:27017/service')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

// Create express app
const app = express();

// Configuring server
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

// Parse json req
app.use(bodyParser.json());
// parse req of content-type - ...urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Require  routes
app.use('/', dishes);
app.use('/', orders);
app.use('/', auth);


// passport configuration
const User = require('./app/models/worker.model.js');

passport.use(new LocalStrategy({
	passReqToCallback: true
},
  function(req,username, password, done) {
    User.findOne({ username: username, role: req.body.role}, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password !== password || user.role !== req.body.role) { 
      	return done(null, false); 
      }
      return done(null, user);
    });
  }
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Listen requests

app.listen(config.server.port, () => {
	console.log(`Server running on port ${config.server.port}`);
})