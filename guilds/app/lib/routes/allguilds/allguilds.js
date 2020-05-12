const express = require('express');
const router = express.Router();

let pool = require('../../db').pool;

//models
let User = require('./../../appModel').User;
let Login = require('./../../appModel').Login;
let Listing = require('./../../appModel').Listing;
let Item = require('./../../appModel').Item;

// @route Post all-guilds
// @desc Route to create guild for user
// @access private
router.post('/', (req, res) => {});

// @route Get all-guilds
// @desc Route to fetch all guilds
// @access private
router.get('/', (req, res) => {
  res.send('allguilds');
});

module.exports = router;
