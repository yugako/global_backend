module.exports = (app) => {
	const Workers = require('../controllers/worker.controller.js');

	const workers = new Workers();
	// Create a new worker
	app.post('/workers', workers.create);

	// Retrieve all workeres
	app.get('/workers', workers.findAll);

	// Retrive a single worker with id
	app.get('/workers/:workerId', workers.findOne);

	// Update worker with id
	app.put('/workers/:workerId', workers.update);

	// Delete worker with id
	app.delete('/workers/:workerId', workers.delete);
}