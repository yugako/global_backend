const Worker = require('../models/worker.model.js');

class Workers {
	// Create and save new worker
	create (req, res) {
		// Validate request
		if (!req.body.name) {
			return res.status(400).send({
				message: 'Worker cannot be unnamed'
			});
		}

		//Create a worker
		const worker = new Worker({
			name: req.body.name,
			password: req.body.password,
		});

		worker.save()
			.then(data => {
				res.send(data);
			}).catch(err => {
				res.status(500).send({
					message: err.message || "Some error occured while creating new worker"
				});
			});
	}
	// Retrieve and return all workeres from db
	findAll (req, res) {
		Worker.find()
			.then(workers => {
				res.send(workers);
			}).catch(err => {
				res.status(500).send({
					message: err.message || "Some error occured while retrieving workers"
				})
			})
	}
	// Find a single worker with workerId
	findOne (req, res) {
		Worker.findById(req.params.workerId)
			.then(worker => {
				if (!worker) {
					return res.status(404).send({
						message: "Worker not found id" + req.params.workerId
					});
				}

				res.send(worker);
			}).catch(err => {
				if(err.kind === 'ObjectId') {
					return res.status(404).send({
						message: 'Worker not found with id ' + req.params.workerId
					});
				}

				return res.status(500).send({
					message: 'Error retrieving worker with id ' + req.params.workerId
				})
			})
	}
	// Update selected worker
	update (req, res) {
		// Validate request
		if (!req.body.name) {
			return res.status(400).send({
				message: 'Worker content cannot be unnamed'
			});
		}
		// Find worker and update it with the request body
		Worker.findByIdAndUpdate(req.params.workerId, {
			name: req.body.name,
			password: req.body.password,
		}, {new: true})
		.then(worker => {
			if (!worker) {
				return res.status(404).send({
					message: "Worker not found with id " + req.params.workerId
				});
			}
			res.send(worker);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Worker not found with id " + req.params.workerId
				})
			}

			return res.status(500).send({
				message: 'Error updating worker with id ' + req.params.workerId
			})
		})
	}
	// Delete worker
	delete (req, res) {
		Worker.findByIdAndRemove(req.params.workerId)
			.then(worker => {
				if (!worker) {
					return res.status(404).send({
						message: "Worker not found with id " + req.params.workerId
					})
				}
				res.send({message: 'Worker deleted successfully'});
			}).catch(err => {
				if(err.kind === 'ObjectId' || err.name === 'NotFound') {
					return res.status(404).send({
						message: "Worker not found with id " + req.params.workerId
					})
				}
				return res.status(500).send({
		            message: "Could not delete worker with id " + req.params.workerId
		        });
			})
	}
}
module.exports = Workers;