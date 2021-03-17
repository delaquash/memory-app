const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error')
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');



const app = express();
app.use(bodyParser.json())

app.use('/api/places',placesRoutes);
app.use('/api/users', usersRoutes);


// Database Connection
const db_Url = "mongodb+srv://delaquash:Equarshie85@mern-memory-app.acsl8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

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

// Database connection
mongoose.connect(db_Url, 
     { 
         useNewUrlParser : true, 
         useUnifiedTopology: true,
         useCreateIndex: true 
    })
        .then(() => {
            app.listen(5000);
        })
        .catch(err => {
            console.log(err)
        });
