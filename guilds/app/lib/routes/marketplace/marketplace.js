const express = require('express');
const router = express.Router();

var pool = require('../../db').pool;
const bcrypt = require('bcrypt');

let User = require('../../models/User').User;
let Login = require('../../models/Login').Login;
let Listing = require('../../models/Listing').Listing;
let Item = require('../../models/Item').Item;

// @route Post marketplace/users
// @desc Route to create lisiting for user
// Needs an item object and a user id
// Assuming the parameter is the item id and we can pull the user id from the current session information
// @access private
router.post('/:itemid', async (req, res) => {
  try {
    var newListing = {
      item_id: req.params.itemid
    }
    const listing = await Listing.createListing(req.listing);
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
