const express = require('express');
const api = require('./routes');
const cors = require('cors');
require('dotenv').config();
const pool = require('./pool.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', api);

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});