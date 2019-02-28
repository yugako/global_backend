// Dishes routes
const dishes = require('./dish.routes.js');

// Orders routes
const orders = require('./order.routes.js');

// Auth routes
const auth = require('./auth');


module.exports = (app) => {
	app.use('/', dishes);
	app.use('/', orders);
	app.use('/', auth);
}
