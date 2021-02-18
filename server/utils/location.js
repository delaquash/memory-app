const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyCTeCwehN_Za6bUFLj4ikWDvz3rY2qSgX0';

async function getCordinateForAddress(address){
    const response = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
    )}&key=${API_KEY}`);

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS'){
        const error = new HttpError(
            "Could not find location for specified address", 422
        );
        throw error;
    }

    const cordinates = data.results[0].geometry.location;

    return cordinates;
}

module.exports = getCordinateForAddress;

