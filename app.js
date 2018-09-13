const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const Cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/error-handler');

const MAIL_ROUTES = require('./api/v1/routes/mail');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(Cors);

app.use('/api/v1/', MAIL_ROUTES);

app.use(errorHandler.badRequest);
app.use(errorHandler.anyError); // @TODO: Uncomment this

module.exports = app;