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

//routers
const authRouther = require('./routes/authRoutes');

//middlewares
app.use('/api/v1/auth', authRouther);
app.use(errorHandlingMiddleware);

//routes
app.get('/', (req, res) => {
    res.send('E-commerce-api');
});

app.get('/api/v1', (req, res) => {
    console.log(req.signedCookies);
    res.send('E-commerce-api');
});


require('./middleware/not-found')(app);

module.exports = app;