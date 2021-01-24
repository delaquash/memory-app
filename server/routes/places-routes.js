const express = require('express');
const HttpError = require('../models/http-error');
const placesControllers = require('../controllers/places-controller');


const router = express.Router();

// get places by id
router.get('/:pid', placesControllers.getPlaceById)
// get places by user id
router.get('/user/:uid',placesControllers.getPlacesByUserId)

// create places 
router.post('/', placesControllers.createPlace);

// Update place route
router.patch('/:pid', placesControllers.updatePlace);

// Delete place route
router.delete('/:pid', placesControllers.deletePlace)

module.exports= router