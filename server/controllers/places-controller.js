// const uuid = require('uuid/v4')
const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');
const router = require('../routes/places-routes');
const { validationResult } = require('express-validator');
const getCordinateForAddress = require('../utils/location');

const Place = require('../models/placeSchema');
const User = require('../models/userSchema');


// Get place by id route
const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    let place;
    try {
         place = await Place.findById(placeId);
    } catch (err) {
        // this error comes up when user search for a missing infornmation
        const error = new HttpError ('Something went wrong', 500);
        return next(error)
    }

// this error shows up when user search for a place that cant be found
    if(!place){
      const error = new HttpError(' Could not find place for the provided ID', 404);
      return next (error);  
    }
res.json({
    // same as res.json({ place: place}) using javascript shorthand syntax
    place: place.toObject({getters: true})
    })
};


// Getting places by user id route
const getPlacesByUserId = async (req, res, next) => {
    const userId= req.params.uid;
    
    let userWithPlaces;
    try {
       userWithPlaces = await User.findById(userId).populated('places') 
    } catch (err) {
        const error = new HttpError('Fetching places failed, please try again', 500)
    };
    return next(error)

    if(!userWithPlaces || userWithPlaces.places.length === 0){
        return next(
            new HttpError('Could not find places for the provided user id', 404)
        );
    }
    res.json ({
        places: userWithPlaces.places.map(place => 
            place.toObject({ getters: true})
            )
    });
}
const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalid credentials passed, please check your data and re-enter.', 422);
    }
    // Has access to to body
     const { title, description, address, creator } = req.body;
     
     let cordinates;
     try {
         cordinates = await getCordinateForAddress(address);
     } catch (error) {
         return next(error);
     }
     const createdPlace =new Place({
         title,
         description,
         location: cordinates,
         address,
         creator,
         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg'
     });

    let user;
    try {
        user = await User.findById(creator)
    } catch (err) {
        const error = new HttpError("Creating place failed, please try again", 500)
    }
    try {
        cordinates = await getCordinateForAddress(address);
    } catch (error) {
        return next(error)
    };
   console.log(user) 
   try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }
  res.status(201).json({ place: createdPlace });
};


const updatePlace = async (req, res, next)=> {
    const error = validationResult(req);
    if(!error.isEmpty()){
       return next (new HttpError('Invalid credentials passed, please check your data and re-enter.', 422)) ;
    }
    // Has access to the body
    const { title, description } = req.body; 
    // to get the place id
    const placeId = req.params.pid;
    // to search for the place in our dummy data
    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError
        ('Something went wrong, could not update the place', 500);
        return next (error)
    }

    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (err) {
        const error = new HttpError("Something went wrong, couln't update place.", 500)
        return next(error);
    }
    res.status(200).json({ place: place.toObject({ getters: true })})
}

const deletePlace = async (req, res, next) => {
   const placeId = req.params.pid;
   let place;
  try {
    place = await Place.findById(placeId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError('Could not find place for this id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted place.' });
};


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;