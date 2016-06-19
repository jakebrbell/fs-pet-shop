'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const bodyParser = require('body-parser');
const morgan = require('morgan');
const basicAccessAuth = require('./basic-access-auth');
const pets = require('./routes/pets');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(basicAccessAuth);
app.use(bodyParser.json());

app.use('/pets', pets);

app.get('/boom', (_req, _res, next) => {
  next(new Error('BOOM!'));
});

app.use((req, res) => {
  res.sendStatus(404);
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  console.error(err);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});
