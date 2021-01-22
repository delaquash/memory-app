const HttpError = require('../models/http-error');

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
const DUMMY_PLACES = [
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
     const { title, description, cordinates, address, creator } = req.body; 
     const createdPlace = {
         title,
         description,
         location: cordinates,
         address,
         creator
     };

     DUMMY_PLACES.push(createdPlace);
     res.status(201).json({ place: createdPlace })
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace= createPlace;