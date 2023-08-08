//packges
require('dotenv/config');
require('express-async-errors');

//imports
const express = require('express');
const errorHandlingMiddleware = require('./middleware/error.handler');
const app = express();

//db
require('./db/connect');

//configs
require('./configs')(app);

//middlewares
app.use(errorHandlingMiddleware);

//routes
app.get('/', (req, res) => {
    res.send('E-commerce-api');
});

require('./middleware/not-found')(app);

module.exports = app;