'use strict';
var sql = require('../db').pool;

//User object constructor

var Listing = function (listing) {
  this.time_posted = listing.time_posted;
  this.time_sold_expired = listing.time_sold_expired;
  this.total_price = listing.total_price;
  this.rent_amount = listing.rent_amount;
  this.insurance_amount = listing.insurance_amount;
  this.lender_id = listing.lender_id;
  this.borrower_id = listing.borrower_id;
  this.completed = listing.completed;
  this.expired = listing.expired;
};

//Listing

//Create a new listing entry
//Returns listing id
Listing.createListing = function (req,res) {
  console.log('creating new listing \n'),
    sql.query(
      'INSERT INTO guilds.listings(item_id,time_posted,total_price,rent_amount,insurance_amount,lender_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [
        listing.item_id,
        listing.time_posted,
        listing.total_price,
        listing.rent_amount,
        listing.insurance_amount,
        listing.lender_id,
      ],
      function (err, resp) {
        if (err) {
          console.log("error creating listing ", err);
          res.status(400);
        } else {
          res.status(200).send(resp.rows[0]);
        }
      }
    );
};
//Return listing that matches listing id
//Only takes in the listing id as a parameter
Listing.getListingByID = function (req,res) {
  sql.query(
    'Select * from guilds.listings where id =($1)',
    [req.listing_id],
    function (err, resp) {
      if (err) {
        console.log("error getting listing by id ", err);
        res.status(400);
      } else {
        res.status(200).send(resp.rows[0]);
      }
    }
  );
};
//Return all listings by a certain borrower id
Listing.getAllBorrowerListings = function (req,res) {
  sql.query(
    'Select * from guilds.listings where borrower_id = ($1)',
    [req.user_id],
    function (err, resp) {
      if (err) {
        console.log("error getting all borrower listings ", err);
        res.status(400);
      } else {
        res.status(200).send(resp.rows);
      }
    }
  );
};
//Return all listings by a certain lender id
Listing.getAllLenderListings = function (req,res) {
  sql.query(
    'Select * from guilds.listings where lender_id = ($1)',
    [req.user_id],
    function (err, resp) {
      if (err) {
        console.log("error getting all lender listings ", err);
        res.status(400);
      } else {
        res.status(200).send(resp.rows);
      }
    }
  );
};
//Updates listing to add a borrower
//Takes in user_id and listing_id
Listing.addBorrower = function (req, res) {
  sql.query(
    'UPDATE guilds.listings SET borrower_id = ($1) where id = ($2)',
    [req.user_id, req.listing_id],
    function (err, resp) {
      if (err) {
        console.log("error adding a borrower ", err);
        res.status(400);
      } else {
        res.status(200);
      }
    }
  );
};
// Updates the listing to be marked completed
// Takes in the completed status,time,listing_id
Listing.markCompleted = function (req,res) {
  sql.query(
    'UPDATE guilds.listings SET completed = ($1), time_sold_expired = ($2) WHERE id = ($3)',
    [req.completed, req.time_sold_expired, req.listing_id],
    function (err, resp) {
      if (err) {
        console.log("error marking complete ", err);
        res.status(400);
      } else {
        res.status(200);
      }
    }
  );
};
//Deletes a listing
//Only takes in listing id
Listing.deleteItem = function (req,res) {
  sql.query(
    "UPDATE guilds.listings SET delete = 'T' where id = ($1)",
    [req.listing_id],
    function (err, resp) {
      if (err) {
        console.log("error deleting listed item ", err);
        res.status(400);
      } else {
        res.status(200);
      }
    }
  );
};
module.exports = {
  Listing,
};
