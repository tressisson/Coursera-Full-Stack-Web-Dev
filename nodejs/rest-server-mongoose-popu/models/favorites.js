// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var favoriteSchema = new Schema({
    dishes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dish',
        unique: true
    }],
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
        timestamps: true
    });


var Favorites = mongoose.model('Favorite', favoriteSchema);

// make this available to our Node applications
module.exports = Favorites;