const express = require('express');

const config = require('../knexfile');
const knex = require('knex')(config);

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.get('/test', (req, res) => {
    res.json({ test: 'Hello world' });
  });

  app.get('/expenses', (req, res) => {
    knex('expenses')
      .select('*')
      .then((result) => {
        // console.log(result);
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return app;
};

module.exports = { setupServer };
