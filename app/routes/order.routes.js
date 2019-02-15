module.exports = (app) => {
	const Orders = require('../controllers/order.controller.js');

	const orders = new Orders();
	// Create a new worker
	app.post('/orders', orders.create);

	// Retrieve all workeres
	app.get('/orders', orders.findAll);

	// Retrive a single worker with id
	app.get('/orders/:workerId', orders.findOne);

	// Update worker with id
	app.put('/orders/:workerId', orders.update);

	// Delete worker with id
	app.delete('/orders/:workerId', orders.delete);
}