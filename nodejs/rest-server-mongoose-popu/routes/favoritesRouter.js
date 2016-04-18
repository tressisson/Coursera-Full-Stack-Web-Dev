var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');

var Verify = require('./verify');

var router = express.Router();
router.use(bodyParser.json());

router.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.find({ "postedBy": req.decoded._doc._id })
            .populate('postedBy')
            .populate('dishes')
            .exec(function (err, favorite) {
                if (err) throw err;
                res.json(favorite);
            });
    })

    .post(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.findOne({ "postedBy": req.decoded._doc._id }, function (err, favorite) {
            if (!favorite) {
                Favorites.create(req.body, function (err, favorite) {
                    if (err) throw err;
                    favorite.postedBy = req.decoded._doc._id;
                    console.log('Favorite created!');
                    favorite.dishes.push(req.body._id);
                    favorite.save(function (err, favorite) {
                        if (err) throw err;
                        console.log('Favorite added');
                        res.json(favorite);
                    });
                });
            } else {
                //the favorite already exists!
                var err = new Error('This dish is in your favorites list');
                err.status = 403;
                return next(err);
            }
        });
    })

    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.remove({ postedBy: req.decoded._doc._id }, function (err, resp) {
            if (err) throw err;

            console.log("Favorites deleted for user: " + req.decoded._doc._id);
            res.json(resp);
        });
    });

router.route('/:favoritesId')

    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.findByIdAndRemove(req.params.favoritesId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

module.exports = router;