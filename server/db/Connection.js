const mongoose = require("mongoose");
const MONGO_URI = "mongodb+srv://delaquash:Equarshie85@mern-memory-app.acsl8.mongodb.net/mern-memory-app?retryWrites=true&w=majority"
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;