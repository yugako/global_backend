const Dish = require('../models/dish.model.js');

// Create and save new dish
exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		return res.status(400).send({
			message: 'Dish content cannot be empty'
		});
	}

	//Create a dish
	const dish = new Dish({
		title: req.body.title || "Untitled dish",
		quantity: req.body.quantity || 1,
		price: req.body.price || 0,
		excerpt: req.body.excerpt || "No short description",
		description: req.body.description || "No description",
		ingradients: req.body.ingradients || "Eat fresh air",
		weight: req.body.weight || "Air has 0 weight",
		status: req.body.status || 'Unprocessed',
		action: req.body.action || "Take in order"
	});

	dish.save()
		.then(data => {
			res.send(data);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error occured while creating the Dish"
			});
		});
};

// Retrieve and return all dishes from db
exports.findAll = (req, res) => {
	Dish.find()
		.then(dishes => {
			res.send(dishes);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error occured while retrieving dishes"
			})
		})
};

// Find a single dish with dishId
exports.findOne = (req, res) => {
	Dish.findById(req.params.dishId)
		.then(dish => {
			if (!dish) {
				return res.status(404).send({
					message: "Dish not found id" + req.params.dishId
				});
			}

			res.send(dish);
		}).catch(err => {
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Dish not found with id ' + req.params.dishId
				});
			}

			return res.status(500).send({
				message: 'Error retrieving dish with id ' + req.params.dishId
			})
		})
};

// Update selected dish
exports.update = (req, res) => {
	// Validate request
	if (!req.body.content) {
		return res.status(400).send({
			message: 'Dish content cannot be empty'
		});
	}
	// Find dish and update it with the request body
	Dish.findByIdAndUpdate(req.params.dishId, {
		title: req.body.title || "Untitled dish",
		quantity: req.body.quantity || 1,
		price: req.body.price || 0,
		excerpt: req.body.excerpt || "No short description",
		description: req.body.description || "No description",
		ingradients: req.body.ingradients || "Eat fresh air",
		weight: req.body.weight || "Air has 0 weight",
		status: req.body.status || 'Unprocessed',
		action: req.body.action || "Take in order"
	}, {new: true})
	.then(dish => {
		if (!dish) {
			return res.status(404).send({
				message: "Dish not found with id " + req.params.dishId
			});
		}
		res.send(dish);
	}).catch(err => {
		if (err.kind === 'ObjectId') {
			return res.status(404).send({
				message: "Dish not found with id " + req.params.dishId
			})
		}

		return res.status(500).send({
			message: 'Error updating dish with id ' + req.params.dishId
		})
	})
};

// Delete dish
exports.delete = (req, res) => {
	Dish.findByIdAndRemove(req.params.dishId)
		.then(dish => {
			if (!dish) {
				return res.status(404).send({
					message: "Dish not found with id " + req.params.dishId
				})
			}
			res.send({message: 'Dish deleted successfully'});
		}).catch(err => {
			if(err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: "Dish not found with id " + req.params.dishId
				})
			}
			return res.status(500).send({
	            message: "Could not delete dish with id " + req.params.dishId
	        });
		})
};