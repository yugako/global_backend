const express = require('express');
const bodyParser = require('body-parser');

// Create express app
const app = express();

// Configuring database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

// Configuring server
const serverConfig = require('./config/server.config.js');

// parse req of content-type - ...urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Parse json req
app.use(bodyParser.json());

// Connecting to db
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
	console.log("Successfully connected to the dishes database");
}).catch(err => {
	console.log('Could not connect to the database. Exiting now...', err);
	process.exit();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// Require  routes
require('./app/routes/home.routes.js')(app);

require('./app/routes/dish.routes.js')(app);

require('./app/routes/worker.routes.js')(app);

require('./app/routes/order.routes.js')(app);
// Listen requests

app.listen(serverConfig.port, () => {
	console.log(`Server running on port ${serverConfig.port}`);
})