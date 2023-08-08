const { json, urlencoded } = require('express');
const cors = require('cors');
const morgan = require('morgan');

module.exports = (app) => {
    app.set('trust proxy', 1);

    app.use(cors());
    app.use(morgan('tiny'));
    app.use(json());
    app.use(urlencoded({extended: false}));
};
