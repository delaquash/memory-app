const express = require('express');
const HttpError = require('../models/http-error');

const router = express.Router();

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

router.get('/:pid', (req, res, next) => {
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
})

router.get('/user/:uid', (req, res, next) => {
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
})

module.exports= router