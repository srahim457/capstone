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
router.post('/', async (req, res) => {
  try {
    var newListing = {
      // item_id: req.params.itemid,
      total_price: req.body.total_price,
      rent_amount: req.body.rent_amount,
      insurance_amount: req.body.insurance_amount,
      lender_id: req.body.lender_id,
    };
    const createdlistingid = await Listing.createListing([newListing], res);
    console.log('listing result', createdlistingid);
    res.sendStatus(createdlistingid);
  } catch (error) {
    console.error('error posting to marketplace');
  }
  console.log('called post request at market');
});

//Gets a listing matching the passed listing id
router.get('/:listingid', async (req, res) => {
  console.log(req.params.listingid);
  try {
    const listing = await Listing.getListingByListingID(
      [req.params.listingid],
      res
    );
    console.log('listing result', listing);
    res.send(listing);
  } catch (error) {
    console.error('error retrieving listing by id');
  }
  console.log('called get listing request by listing id');
});

//Marks a listing as reserved so only one person can see it
router.get('/:listingid/reserve', async (req, res) => {
  console.log(req.params.listingid);
  try {
    const listing = await Listing.reserveListing([req.params.listingid], res);
    console.log('reserving listing', listing);
    res.send(listing);
  } catch (error) {
    console.error('error reserving listing by id');
  }
  console.log('called reserve listing by listing id');
});

//Frees a reserved listing so others can click on it
router.get('/:listingid/unreserve', async (req, res) => {
  console.log(req.params.listingid);
  try {
    const listing = await Listing.unreserveListing([req.params.listingid], res);
    console.log('reserving listing', listing);
    res.send(listing);
  } catch (error) {
    console.error('error unreserving listing by id');
  }
  console.log('called unreserve listing by listing id');
});

//Gets all active listings
router.get('/active', async (req, res) => {
  try {
    const activelistings = await Listing.getAllActiveListings(req, res);
    res.send(activelistings);
  } catch (err) {
    console.err('error getting all active listings');
  }
  console.log('called get active listings');
});

//Gets all listings
router.get('/', async (req, res) => {
  try {
    const alllistings = await Listing.getEveryListing(req, res);
    res.send(alllistings);
  } catch (err) {
    console.err('error getting all listings');
  }
  console.log('called get all listings');
});

//Gets all listings with user id as the borrower
//Looks for req.user.id as a param
router.get('/borrowed', async (req, res) => {
  try {
    const alllistings = await Listing.getAllBorrowerListings(req.user.id, res);
    res.send(alllistings);
  } catch (err) {
    console.err('error getting all listings');
  }
  console.log('called get all listings');
});

//Gets all listing that have the user id as a lender
//Look for req.user.id as a param
router.get('/listed', async (req, res) => {
  try {
    const alllistings = await Listing.getAllLenderListings(req.user.id, res);
    res.send(alllistings);
  } catch (err) {
    console.err('error getting all listings');
  }
  console.log('called get all listings');
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

// // @route Get marketplace/users
// // @desc Route to get item from user
// // @access private
// router.get('/', (req, res) => {
//   res.json(item);
// });

module.exports = router;
