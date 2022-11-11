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
    const id = req.query.id;
    if (typeof id === 'undefined') {
      knex('expenses')
        .select('*')
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (id.match(/^[0-9]+$/)) {
      knex('expenses')
        .select('*')
        .where({ id: id })
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return app;
};

module.exports = { setupServer };
