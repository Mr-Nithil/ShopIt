const app = require('./app');
// import app from './app'
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

// Handle uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting Down server due to uncaught exceptions");
    process.exit(1);
});

// Setting up config file
dotenv.config({ path: 'backend/.env' });

// Connecting Database
connectDatabase();

// Setting up Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const PORT = process.env.PORT || 4000;
const server = app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server started on PORT ${PORT} in ${process.env.NODE_ENV} mode.`);
});



// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejections');
    server.close(() => {
        process.exit(1);
    });
});
