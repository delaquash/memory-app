// const uuid = require('uuid/v4')
const { v4: uuidv4 } = require('uuid');
const { prepareStackTrace } = require('../models/http-error');
const HttpError = require('../models/http-error');
const router = require('../routes/places-routes');


// Get place by id route
const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
         return p.id === placeId;
    })
    if(!place){
       throw new HttpError(' Could not find place for the provided ID');  
    }
res.json({
    // same as res.json({ place: place}) using javascript shorthand syntax
   place
})
};

// Getting places by user id route

const getPlaceByUserId = (req, res, next) => {
    const userId= req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId; 
    }); 
    if(!place){
        return next 
        new HttpError ('Could not find a place for the provided user id');   
    }
    res.json({
        place
    })
}


// Dummy data
let DUMMY_PLACES = [
    {
        id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrappers in the world!',
    location: {
        lat: 40.7484474,
        long: - 73.9871516
    },
    address: '20W 34th St, New York, NY 10001',
    creator: 'ul' 
    }  
];

const createPlace = (req, res, next) => {
    // Has access to to body
     const { title, description, cordinates, address, creator } = req.body; 
     const createdPlace = {
         id:uuidv4(),
         title,
         description,
         location: cordinates,
         address,
         creator
     };

     DUMMY_PLACES.push(createdPlace);
     res.status(201).json({ place: createdPlace })
};

const updatePlace = (req, res, next)=> {
    // Has access to the body
    const { title, description, cordinates, address, creator } = req.body; 
    // to get the place id
    const placeId = req.params.pid;
    // to search for the place in our dummy data
    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex]= updatedPlace;
    res.status(200).json({place: updatedPlace});
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid
   DUMMY_PLACES =  DUMMY_PLACES.filter(p => p.id !== placeId);
   res.status(200).json({ message: "Deleted Place!"})
}


exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace= createPlace;
exports.updatePlace= updatePlace;
exports.deletePlace = deletePlace;