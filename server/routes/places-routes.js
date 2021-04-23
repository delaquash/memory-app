const express = require('express');
const { check } = require('express-validator');
const HttpError = require('../models/http-error');
const placesControllers = require('../controllers/places-controller');

const router = express.Router();

// get places by id
router.get('/:pid', placesControllers.getPlaceById)
// get places by user id
router.get('/user/:uid',placesControllers.getPlacesByUserId)

// create places 
router.post('/',
check('title').not().isEmpty(),
check('description').not().isEmpty().isLength({ min: 5}),
check('address').not().isEmpty(),
placesControllers.createPlace);

// Update place route
router.patch('/:pid', 
check('title').not().isEmpty(),
check('description').not().isEmpty().isLength({ min: 5}),
placesControllers.updatePlace);

// Delete place route
router.delete('/:pid', placesControllers.deletePlace)

module.exports= router