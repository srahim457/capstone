const express = require('express');
const router = express.Router();

let pool = require('../../db').pool;

let User = require('./../../appModel').User;
let Login = require('./../../appModel').Login;
let Listing = require('./../../appModel').Listing;
let Item = require('./../../appModel').Item;

// @route  Edits profile
// @desc Route to create guild for user
// @access private
router.put('/', (req, res) => {});

// @route Post all-guilds
// @desc Route to fetch profile
// @access private
router.get('/', (req, res) => {
  res.send('Profile');
});
module.exports = router;
