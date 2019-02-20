const mongoose = require('mongoose');

const DishSchema = mongoose.Schema({
	title: String,
	img: String,
	quantity: Number,
	price: Number,
	excerpt: String,
	description: String,
	ingradients: String,
	weight: Number,
	status: String,
	action: String
}, {
	timestamps: true,
	collection : 'dishes'
}
);

module.exports = mongoose.model('Dish', DishSchema);