const {validationResult } = require('express-validator/check');
const passport = require('passport');
const AppError = require('./AppError');
const winston = require('../../config/winston');

class AppController {
	constructor (model) {
		this._model = model;
		this.create = this.create.bind(this);
		this.findAll = this.findAll.bind(this);
		this.findOne = this.findOne.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
	}
	create (req, res) {
		// Validate request
		const errors = validationResult(req);
		  if (!errors.isEmpty()) {
		    return res.status(422).json({ 
		    	errors: errors.array() 
		    });
		  }
		let obj = req.body;

		//Create a item
		const object = new this._model(obj);

		object.save()
			.then(data => {
				res.send(data);
			}).catch(err => {
				winston.log('error', err);
				const error = new AppError('Internal server error', 500, 'The object could not be saved.');
				res.send(error);
			});
	}
	findAll(req, res) {
		this._model.find()
			.then(items => {
				res.send(items);
			}).catch(err => {
				winston.log('error', err);
				const error = new AppError('Internal server error', 500, 'The objects you are trying to show could not be found.');
				res.send(error);
			})
	}
	findOne (req, res) {
		this._model.findById(req.params.itemId)
			.then(item => {
				if (!item) {
					return res.status(404).send({
						message: "Your request object not found"
					});
				}
				res.send(item);
			}).catch(err => {
				winston.log('error', err);
				const error = new AppError('OBJECT_NOT_FOUND', 404, 'Your request object not found');
				res.send(error);
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
					message: "Your request object not found"
				});
			}
			res.send(item);
		}).catch(err => {
			winston.log('error', err);
			const error = new AppError('OBJECT_NOT_FOUND', 404, 'The object you are trying to update could not be found.');
			res.send(error);
		})
	}

	delete (req, res) {
		this._model.findByIdAndRemove(req.params.itemId)
			.then(item => {
				if (!item) {
					return res.status(404).send({
						message: "Your request object not found"
					})
				}
				res.send({
					message: 'Object deleted successfully'
				});
			}).catch(err => {
		        winston.log('error', err);
				const error = new AppError('OBJECT_NOT_FOUND', 404, 'The object you are trying to delete could not be found.');
				res.send(error);
			})
	}
}

module.exports = AppController;