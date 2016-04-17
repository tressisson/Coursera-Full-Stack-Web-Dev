// Module mongoose for Leaders: Assignment 2, Task 3

// Grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Create a schema for leaders
var leaderSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	image: {
		type: String,
		required: true
	},
	designation: {
		type: String,
		required: true
	},
	abbr: {
		type: String,
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
var Leadership = mongoose.model('Leader', leaderSchema);

// Make this available to our Node applications
module.exports = Leadership;

