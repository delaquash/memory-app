const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places-routes');
const app = express();

app.use('/api/places',placesRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error)
    }
    // if error is from code property or we decide switvh to error on the server
    res.status(error.code || 500);
    res.json({message: error.message || 'An unkknown error occurred'});
})


app.listen(5000);