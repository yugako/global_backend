const mongoose = require('mongoose');

const DishSchema = mongoose.Schema({
	title: String,
	quantity: Number,
	price: Number,
	excerpt: String,
	description: String,
	ingradients: String,
	weight: Number,
	status: String,
	action: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Dish', DishSchema);