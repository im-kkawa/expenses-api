const express = require('express');

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.get('/test', (req, res) => {
    res.json({ test: 'Hello world' });
  });

  return app;
};

module.exports = { setupServer };
