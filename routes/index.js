const express = require('express');
require('dotenv').config();
const summaries = require('./summaries');

const router = express.Router();

router.use('/summaries', summaries);

module.exports = router;