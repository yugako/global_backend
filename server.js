const express = require('express');
const bodyParser = require('body-parser');

// CORS
const cors = require('cors');

// Configuring database
const mongooseConnection = require('./app/mongoose.js');

// Configuring server
const serverConfig = require('./config/server.config.js');

// Dishes routes
const dishes = require('./app/routes/dish.routes.js');

// Orders routes
const orders = require('./app/routes/order.routes.js');

// Workers routes
const workers = require('./app/routes/worker.routes.js');

// Create express app
const app = express();

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

// Listen requests

app.listen(serverConfig.port, () => {
	console.log(`Server running on port ${serverConfig.port}`);
})