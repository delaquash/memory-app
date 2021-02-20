const mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const placeShema = new Schema({
    title: {

    }, 
    description: {

    }, 
    image: {

    }, 
    address: {

    }, 
    location:  {
        lat: {

        }, 
            lng: {

        }
    }, 
    creator : {

    }
})

module.exports= mongoose.model('Place', placeShema);