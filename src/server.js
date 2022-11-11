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

  app.post('/expenses', (req, res) => {
    const postData = req.body;
    let currentSequence;
    knex('expenses')
      .max('id')
      .then((result) => {
        currentSequence = result[0]['max'];
        postData.id = currentSequence + 1;
        knex('expenses')
          .insert(postData)
          .catch((err) => {
            console.log(err);
          });
        res.json(postData);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return app;
};

// async function getAllData(table) {
//   let res;
//   await knex(table)
//     .select('*')
//     .then((result) => {
//       // console.log(result);
//       return result;
//     })
//     .catch((err) => {
//       res = err;
//     });
//   // console.log(res);
//   // return res;
// }

module.exports = { setupServer };
