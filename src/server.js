const express = require('express');
const config = require('../knexfile');
const knex = require('knex')(config);

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.get('/test', (req, res) => {
    res.json({ test: 'Hello world' });
  });

  app.get('/expenses', async (req, res) => {
    const id = req.query.id;
    let resData;
    if (typeof id === 'undefined') {
      resData = await selectAllData('expenses');
    } else if (id.match(/^[0-9]+$/)) {
      resData = await selectData('expenses', id);
    }
    res.json(resData);
  });

  app.post('/expenses', async (req, res) => {
    const postData = req.body;
    let resData;
    await insertData('expenses', postData);
    resData = await selectAllData('expenses');
    res.json(resData);
  });

  app.delete('/expenses', async (req, res) => {
    const id = req.query.id;
    let resData;
    await deleteData('expenses', id);
    resData = await selectAllData('expenses');
    res.json(resData);
  });

  app.patch('/expenses', async (req, res) => {
    const sendData = req.body;
    const id = sendData.id;
    let resData;
    await patchData('expenses', id, sendData);

    resData = await selectAllData('expenses');
    res.json(resData);
  });

  return app;
};

function selectAllData(table) {
  return knex(table)
    .select('*')
    .then((result) => result)
    .catch((err) => console.log(err));
}

function selectData(table, id) {
  return knex(table)
    .select('*')
    .where({ id: id })
    .then((result) => result)
    .catch((err) => console.log(err));
}

function insertData(table, postData) {
  let currentSequence;
  return knex(table)
    .max('id')
    .then((result) => {
      currentSequence = result[0]['max'];
      postData.id = currentSequence + 1;
      knex(table)
        .insert(postData)
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function deleteData(table, id) {
  return knex(table)
    .where({ id: id })
    .del()
    .catch((err) => console.log(err));
}

function patchData(table, id, sendData) {
  return knex(table)
    .where({ id: id })
    .update(sendData)
    .catch((err) => console.log(err));
}

module.exports = { setupServer };
