// external import
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('./config/db');

// internal import 
const fileRoute = require('./routes/fileRoute');

const app = express()

// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// routes
app.use("/api/files", fileRoute)


// error handle
app.use((err, req, res, next) => {
    
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ 
            error: 'Multer Error: ' + err.message 
        });
    }
    
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


module.exports = app;
