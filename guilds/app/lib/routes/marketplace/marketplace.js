const express = require('express');
const router = express.Router();

var pool = require('../../db').pool;
const bcrypt = require('bcrypt');

let User = require('./../../appModel').User;
let Login = require('./../../appModel').Login;
let Listing = require('./../../appModel').Listing;
let Item = require('./../../appModel').Item;

// @route Post marketplace/users
// @desc Route to create lisiting for user
// @access private
router.post('/:userid', async (req, res) => {
  try {
    const listing = await Listing.createListing;
    res.send(listing);
  } catch (err) {
    console.err('error posting to marketplace');
  }
  console.log('called post request at market');
});

//example;
const item = [
  {
    id: 1,
    name: 'Ball',
    cost: 2.3,
    policy: 'if lost owe me $',
  },
  {
    id: 2,
    name: 'Ball',
    cost: 2.3,
    policy: 'if lost owe me $',
  },
  {
    id: 3,
    name: 'Ball',
    cost: 2.3,
    policy: 'if lost owe me $',
  },
];

// @route Get marketplace/users
// @desc Route to get item from user
// @access private
router.get('/', (req, res) => {
  res.json(item);
});

module.exports = router;
