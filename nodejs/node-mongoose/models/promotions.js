// Module mongoose for Promotions: Assignment 2, Task 2

// Grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// Create a schema for promotions
var promoSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	image: {
		type: String,
		required: true
	},
	label: {
		type: String,
		required: false,
		default: ""
	},
	price: {
		type: Currency,
		required: true
	},
	description: {
		type: String,
		required: true
	}
},
{
	timestamps: true
});

// The schema is useless so far
// we need to create a model using it
var Promotions = mongoose.model('Promotion', promoSchema);

// Make this available to our Node applications
module.exports = Promotions;

