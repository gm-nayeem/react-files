// external import
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('./config/db');

// internal import 
// const authRoute = require('./router/authRoute')

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// routes
// app.use("/api/auth", authRoute)


// error handle
app.use((err, req, res, next) => {
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
