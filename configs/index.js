const { json, urlencoded } = require('express');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

module.exports = (app) => {
    app.set('trust proxy', 1);
    app.use(rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 60,
    }));
    app.use(helmet());
    app.use(xss());
    app.use(mongoSanitize());

    app.use(cors());
    app.use(morgan('tiny'));
    app.use(cookieParser(process.env.JWT_Secret));

    app.use(express.static('./public'));
    app.use(fileUpload());
    app.use(json());
    app.use(urlencoded({extended: false}));
};
