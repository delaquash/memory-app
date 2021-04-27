const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const connectDB = require('./db/Connection')
const HttpError = require('./models/http-error')
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');



const app = express();
// app.use(bodyParser.json()) deprecated
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use('/api/places',placesRoutes);
app.use('/api/users', usersRoutes);

// connectDB()
// Database Connection
const db_Url = "mongodb+srv://delaquash:Equarshie85@MERN-MEMORY-APP.acsl8.mongodb.net/user?retryWrites=true&w=majority";

// Handling errors for unsupported routes
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
})

// handling cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'x');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next()
})


// Error handling middleware
app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error)
    }
    // if error is from code property or we decide switvh to error on the server
    res.status(error.code || 5000);
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
            console.log("Connected")
            app.listen(5000);
        })
        .catch(err => {
            console.log(err)
        });
