const { json, urlencoded } = require('express');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

module.exports = (app) => {
    app.set('trust proxy', 1);

    app.use(cors());
    app.use(morgan('tiny'));
    app.use(cookieParser(process.env.JWT_Secret));

    app.use(express.static('./public'));
    app.use(fileUpload());
    app.use(json());
    app.use(urlencoded({extended: false}));
};
