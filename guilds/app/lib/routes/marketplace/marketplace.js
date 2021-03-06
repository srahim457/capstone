const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

var pool = require('../../db').pool;
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

let User = require('../../models/User').User;
let Login = require('../../models/Login').Login;
let Listing = require('../../models/Listing').Listing;

const storage = multer.diskStorage({
  destination: '../public/market', //orig ../public/uploads
  filename: function (req, file, cb) {
    cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single('myImage');

let itemId;

// @route Post
// @desc Route to create lisiting for user
// Needs an item object and a user id
// Assuming the parameter is the item id and we can pull the user id from the current session information
// @access private
router.post('/create', auth, async (req, res) => {
  console.log('current create req \n', req.body.item);
  try {
    //assumes req.body.item is the created object item


    var newItem = {
      item_name: req.body.item.name,
      item_desc: req.body.item.description,
      //picture: req.body.item.picture, //add picture@!!!
    };

    const createdItemId = await Listing.createItem([newItem], res);
    itemId = createdItemId;
    /*
      Still need to implement the check if it is a sale,rental,loan
    */
    const newListing = {
      item_id: createdItemId,
      return_by: req.body.item.date,
      policy: req.body.item.policy,
      total_price: req.body.item.price,
      rent_amount: req.body.item.price,
      insurance_amount: req.body.item.insurance,
      lender_id: req.user.id,
    };
    console.log('created Itemid is', newListing.item_id);
    if (req.body.item.option === 'sale') {
      const createdSale = await Listing.createSaleListing([newListing], res);
      console.log('created sale listing is \n ', createdSale);
      res.status(200).json(createdSale);
    }
    if (req.body.item.option === 'loan') {
      const createdLoan = await Listing.createLoanListing([newListing], res);
      console.log('created loan listing is \n', createdLoan);
      res.status(200).json(createdLoan);
    }
    if (req.body.item.option === 'rental') {
      const createdRental = await Listing.createRentalListing(
        [newListing],
        res
      );
      console.log('created rental listing is \n', createdRental);
      res.status(200).json(createdRental);
    }
  } catch (error) {
    console.error('error creating to marketplace \n', error);
  }
  console.log('called post request for create at market');
});

// @route UPDATE /picture
// @desc Update users profile picture
// @access Private
router.post('/picture', auth, async (req, res) => {
  await upload(req, res, (err) => {
    //console.log('Request ---', req.body);
    //console.log('Request file ---', req.file); //Here you get file.
    /*Now do where ever you want to do*/

    let path = req.file.path;
    console.log(itemId, 'Passed item id')
    const imageObj = {
      id: itemId, //item id here instead
      image_picture: path,
    };

    Listing.createItemImage([imageObj], res);
    if (!err) {
      return res.sendStatus(200).end();
    }
  });
});


//Gets a listing matching the passed listing id
router.get('/:listingid', auth, async (req, res, next) => {
  console.log(req.params.listingid, parseInt(req.params.listingid, 10));
  if (!Number.isInteger(parseInt(req.params.listingid, 10))) {
    console.log('not a number in /:listingid', typeof req.params.listingid);
    next();
  } else {
    try {
      const listing = await Listing.getListingByListingID(
        [req.params.listingid],
        res
      );
      console.log('listing result', listing);
      res.status(200).json(listing);
    } catch (error) {
      console.error('error retrieving listing by id \n', error);
    }
    console.log('called get listing request by listing id', req.params.listingid);
  }
});
//Gets a listing matching the passed name
router.get('/search/:query', auth, async (req, res, next) => {
  console.log(req.params.query);
  try {
    console.log('seaching for a listing', req.params.query)
    const listing = await Listing.searchForListing([req.params.query], res);
    console.log('listing result', listing);
    res.status(200).json(listing);
  } catch (error) {
    console.error('error searching for a listing \n', error);
  }
  console.log('called search for listing', req.params);
});

//Borrows a listing
router.get('/:listingid/borrow', auth, async (req, res) => {
  console.log(req.params.listingid);
  try {
    var ids = {
      user_id: req.user.id,
      listing_id: req.params.listingid,
    };
    const listing = await Listing.addBorrower([ids], res);
    console.log('borrowing listing', listing);
    res.status(200).json(listing);
  } catch (error) {
    console.error('error marking listing as borrowed \n ', error);
  }
  console.log('called borrow listing by listing id');
});

//Cancels borrowing a listing in case a user decides to change their mind
router.get('/:listingid/borrow/cancel', auth, async (req, res) => {
  console.log(req.params.listingid);
  try {
    const listing = await Listing.removeBorrower([req.params.listingid], res);
    console.log('unborrowing listing', listing);
    res.status(200).json(listing);
  } catch (error) {
    console.error('error freeing a listing from borrowed \n ', error);
  }
  console.log('called borrow listing by listing id');
});

//Marks a listing as reserved so only one person can see it
router.get('/:listingid/reserve', auth, async (req, res) => {
  console.log(req.params.listingid);
  try {
    console.log('reserving listing', req.params.listingid);
    parameters = {
      listingid: req.params.listingid,
      user_id: req.user.id
    }
    const listing = await Listing.reserveListing([parameters], res);
    res.status(200).json(listing);
  } catch (error) {
    console.error('error reserving listing by id \n ', error);
  }
  console.log('called reserve listing by listing id');
});

//Frees a reserved listing so others can click on it
router.get('/:listingid/unreserve', auth, async (req, res) => {
  console.log(req.params.listingid);
  try {
    console.log('unreserving listing', req.params.listingid);
    parameters = {
      listingid: req.params.listingid,
      user_id: req.user.id
    }
    const listing = await Listing.unreserveListing([parameters], res);
    res.status(200).json(listing);
  } catch (error) {
    console.error('error unreserving listing by id \n', error);
  }
  console.log('called unreserve listing by listing id');
});

//Gets all active listings
router.get('/active', auth, async (req, res) => {
  try {
    const activelistings = await Listing.getAllActiveListings(req, res);
    res.status(200).json(activelistings);
    const unreservedlistings = await Listing.freeListings(req, res)
  } catch (error) {
    console.error('error getting all active listings \n', error);
  }
  console.log('called get active listings');
});

//Gets all listings
router.get('/complete/:id', auth, async (req, res) => {
  try {
    idtouse = 0
    if (req.params.id == -1) {
      console.log('no id detected reverting to current user')
      idtouse = req.user.id
    }
    else {
      idtouse = req.params.id
    }
    const alllistings = await Listing.getAllCompletedListings(idtouse, res);
    res.status(200).json(alllistings);
  } catch (error) {
    console.error('error getting all completed  listings\n', error);
  }
  console.log('called get all completed listings');
});

//Gets all listings
router.get('/', auth, async (req, res) => {
  try {
    const alllistings = await Listing.getEveryListing(req, res);
    res.status(200).json(alllistings);
  } catch (error) {
    console.error('error getting all listings\n', error);
  }
  console.log('called get all listings');
});

//Marks a transaction complete
router.put('/rate/:id', auth, async (req, res) => {
  try {
    console.log('transaction rated marking completed ', req.params.id)
    const alllistings = await Listing.markCompleted(req.params.id);
    return res.status(200).json(alllistings);
  } catch (error) {
    console.error('error getting all listings\n', error);
  }
  console.log('called get all listings');
});
//Edits a listing with the item id passed
router.put('/:id', auth, async (req, res) => {
  try {
    console.log(' editing the listing ', req.params.id, req.body.toUpdate)
    itemId = req.params.id; //added to update picture
    var newItemInfo = req.body.toUpdate.newItem
    var itemToUpdate = {
      item_id: req.params.id,
      item_name: newItemInfo.name,
      item_desc: newItemInfo.description,
      //image: newItemInfo.image
    }


    const updatedItem = await Listing.updateItem([itemToUpdate], res)
    if (newItemInfo.option == 'sale') {
      var listingToUpdate = {
        item_id: req.params.id,
        price: newItemInfo.price,
        type: newItemInfo.option,
        policy: newItemInfo.policy
      }
      const updatedListings = await Listing.updateSaleListing([listingToUpdate], res);
      return res.status(200).json(updatedListings);
    } else if (newItemInfo.option == 'loan') {
      var listingToUpdate = {
        item_id: req.params.id,
        price: '',
        type: newItemInfo.option,
        return_by: newItemInfo.date,
        policy: newItemInfo.policy,
        insurance: newItemInfo.insurance
      }
      const updatedListings = await Listing.updateLoanListing([listingToUpdate], res);
      return res.status(200).json(updatedListings);
    }
    else {
      //At this point its a rental
      var listingToUpdate = {
        item_id: req.params.id,
        price: newItemInfo.price,
        type: newItemInfo.option,
        return_by: newItemInfo.date,
        policy: newItemInfo.policy,
        insurance: newItemInfo.insurance
      }
      const updatedListings = await Listing.updateRentalListing([listingToUpdate], res);
      return res.status(200).json(updatedListings);
    }

  } catch (error) {
    console.error('error getting all listings\n', error);
  }
  console.log('called get all listings');
});

//Gets all listings with user id as the borrower
//Looks for req.user.id as a param
router.get('/borrowed/:id', auth, async (req, res) => {
  try {
    idtouse = 0
    if (req.params.id == -1) {
      console.log('no id detected reverting to current user')
      idtouse = req.user.id
    }
    else {
      idtouse = req.params.id
    }
    console.log('getting all borrowed items for  \n', idtouse);
    const alllistings = await Listing.getAllBorrowerListings(
      idtouse,
      res
    );
    console.log('all borrowed listings \n', alllistings.length);
    res.status(200).json(alllistings);
  } catch (error) {
    console.error('error getting all borrowed listings \n ', error);
  }
  console.log('called get all listings with borrower id');
});

//Gets all listing that have the user id as a lender
//Look for req.user.id as a param
router.get('/listed/:id', auth, async (req, res) => {
  try {
    idtouse = 0
    if (req.params.id == -1) {
      idtouse = req.user.id
      console.log('no id detected reverting to current user \n', idtouse)
    }
    else {
      idtouse = req.params.id
    }
    const alllistings = await Listing.getAllLenderListings(
      idtouse,
      res
    );
    console.log('all listed listings \n', alllistings.length);
    res.status(200).json(alllistings);
  } catch (error) {
    console.error('error getting all listed listings', error);
  }
  console.log('called get all listings with lender id');
});

//"Deletes" a listing
router.get('/delete/:id', auth, async (req, res) => {
  try {
    console.log('deleting listing with id  \n', req.params.id);
    const deleted = await Listing.delete([req.params.id], res);
    // console.log('deleted result \n ', deleted)
    res.status(200).json(deleted);
  } catch (error) {
    console.error('error deleting a listing \n ', error);
  }
  console.log('called delete listing with id');
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
