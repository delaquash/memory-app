const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error')
const app = express();
app.use(bodyParser.json())

app.use('/api/places',placesRoutes);
app.use('/api/users', usersRoutes);

// Handling errors for unsupported routes
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
})


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