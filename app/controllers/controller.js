const { check, validationResult } = require('express-validator/check');
const passport = require('passport');

class AppController {
	constructor (model) {
		this._model = model;
		this.create = this.create.bind(this);
		this.findAll = this.findAll.bind(this);
		this.findOne = this.findOne.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
		this.register = this.register.bind(this);
	}
	create (req, res) {
		// Validate request
		const errors = validationResult(req);
		  if (!errors.isEmpty()) {
		    return res.status(422).json({ errors: errors.array() });
		  }
		let obj = req.body;

		//Create a item
		const object = new this._model(obj);

		object.save()
			.then(data => {
				res.send(data);
			}).catch(err => {
				res.status(500).send({
					message: err.message || "Some error occured while creating the Model"
				});
			});
	}
	findAll(req, res) {
		this._model.find()
			.then(items => {
				res.send(items);
			}).catch(err => {
				res.status(500).send({
					message: err.message || "Some error occured while retrieving items"
				})
			})
	}
	findOne (req, res) {
		this._model.findById(req.params.itemId)
			.then(item => {
				if (!item) {
					return res.status(404).send({
						message: "Model not found id " + req.params.itemId
					});
				}

				res.send(item);
			}).catch(err => {
				if(err.kind === 'ObjectId') {
					return res.status(404).send({
						message: 'Model not found with id ' + req.params.itemId
					});
				}

				return res.status(500).send({
					message: 'Error retrieving item with id ' + req.params.itemId
				})
			})
	}
	update (req, res) {
		// Validate request
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
		    return res.status(422).json({ errors: errors.array() });
		}
		// Find item and update it with the request body
		this._model.findByIdAndUpdate(req.params.itemId, req.body, {new: true})
		.then(item => {
			if (!item) {
				return res.status(404).send({
					message: "Model not found with id " + req.params.itemId
				});
			}
			res.send(item);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Model not found with id " + req.params.itemId
				})
			}

			return res.status(500).send({
				message: 'Error updating item with id ' + req.params.itemId
			})
		})
	}
	delete (req, res) {
		this._model.findByIdAndRemove(req.params.itemId)
			.then(item => {
				if (!item) {
					return res.status(404).send({
						message: "Model not found with id " + req.params.itemId
					})
				}
				res.send({message: 'Model deleted successfully'});
			}).catch(err => {
				if(err.kind === 'ObjectId' || err.name === 'NotFound') {
					return res.status(404).send({
						message: "Model not found with id " + req.params.itemId
					})
				}
				return res.status(500).send({
		            message: "Could not delete item with id " + req.params.itemId
		        });
			})
	}
	logout (req, res) {
	  req.logout();
	  res.send('/');
	}

	login (req, res) {
		passport.authenticate('local')(req, res, function () {
		    res.send({
		    	username: req.body.username, 
		    	role: req.body.role
			})
		})
	}
	

	register(req, res) {
		const errors = validationResult(req);
		  if (!errors.isEmpty()) {
		    return res.status(422).json({ errors: errors.array() });
		  }
		let obj = req.body;

	  this._model.register(new this._model(obj), obj.password, function(err, user) {
	    if (err) {
	      res.send(err)
	    }

	    passport.authenticate('local')(req, res, function () {
	      res.send('Success');
	    });
	  });
	}
}

module.exports = AppController;