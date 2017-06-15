'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/secure', (req, res) => {
  const opts = {
    url: 'http://localhost:3000/token',
    form: {
      client_id: 'client',
      client_secret: 'secret',
      grant_type: 'client_credentials',
    },
  };

  request.post(opts, (err, httpResponse, body) => {
    if (err) {
      console.log(err);
      res.status(200).send('Not OK');
    } else {
      res.status(200).send(`OK`);
    }
  });
});

const client = app.listen(4000, (obj) => {
  console.info('Client listening on port %d', client.address().port);
});
