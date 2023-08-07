require('dotenv/config');

const express = require('express');
const app = express();

//db

//configs

//routes

//errors
app.use((req, res, next) => {
    res.status(404).json('Not Found!');
});

module.exports = app;