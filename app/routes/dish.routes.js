module.exports = (app) => {
	const dishes = require('../controllers/dish.controller.js');

	// Create a new dish
	app.post('/dishes', dishes.create);

	// Retrieve all dishes
	app.get('/dishes', dishes.findAll);

	// Retrive a single dish with id
	app.get('/dishes/:dishId', dishes.findOne);

	// Update dish with id
	app.put('/dishes/:dishId', dishes.update);

	// Delete dish with id
	app.delete('/dishes/:dishId', dishes.delete);
}