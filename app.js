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
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');

//middlewares
app.use(errorHandlingMiddleware);

//routes
app.get('/', (req, res) => {
    res.send('E-commerce-api');
});

app.get('/api/v1', (req, res) => {
    console.log(req.signedCookies);
    res.send('E-commerce-api');
});

app.use('/api/v1/auth', authRouther);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);


require('./middleware/not-found')(app);

module.exports = app;