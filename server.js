const express = require('express');
const bodyParser = require('body-parser');

// Create express app

const app = express();

// parse req of content-type - ...urlencoded

app.use(bodyParser.urlencoded({extended: true}));

// Parse json req

app.use(bodyParser.json())

// Configuring database

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to db

mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
	console.log("Successfully connected to the database");
}).catch(err => {
	console.log('Could not connect to the database. Exiting now...', err);
	process.exit();
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
// define simple route

app.get('/', (req, res) => {
	res.json({"message": "Welcome to Note app"});
});

// Require notes routes
require('./app/routes/dish.routes.js')(app);
// Listen requests

app.listen(3000, () => {
	console.log("Server running on port 3000");
})