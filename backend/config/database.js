require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;

const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("DB connected");
        })
        .catch((error) => {
            console.error("DB failed to connect:", error);
        });
}

module.exports = connectDatabase;
