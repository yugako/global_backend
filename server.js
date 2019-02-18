const express = require('express');
const bodyParser = require('body-parser');

// CORS
const cors = require('cors');

// Configuring database
const mongooseConnection = require('./config/mongoose-connect.js');

// Dishes routes
const dishes = require('./app/routes/dish.routes.js');

// Orders routes
const orders = require('./app/routes/order.routes.js');

// Workers routes
const workers = require('./app/routes/worker.routes.js');
// Auth routes
const auth = require('./app/routes/auth');

// Create express app
const app = express();

// Configuring server

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

// parse req of content-type - ...urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Parse json req
app.use(bodyParser.json());

// Connect to db
app.use(function (req, res, next) {
  mongooseConnection();
  next();
});

app.use(cors());

// Require  routes
app.use('/', dishes);
app.use('/', orders);
app.use('/', workers);
app.use('/', auth);

// Listen requests

app.listen(config.server.port, () => {
	console.log(`Server running on port ${config.server.port}`);
})