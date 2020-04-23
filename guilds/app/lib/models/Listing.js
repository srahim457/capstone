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
Listing.createListing = function (listing, result) {
  console.log('creating new listing w/', listing),
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
      function (err, res) {
        if (err) {
          console.log('error: ', err);
          result(err, null);
        } else {
          console.log(res.rows[0]);
          result(null, res.rows[0].id);
        }
      }
    );
};
//Return listing that matches listing id
//Only takes in the listing id as a parameter
Listing.getListingByID = function (listing_id, result) {
  sql.query(
    'Select * from guilds.listings where id = ANY ($1)',
    [listing_id],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('found the listing');
        result(null, res);
      }
    }
  );
};
//Return all listings by a certain borrower id
Listing.getAllBorrowerListings = function (user_id, result) {
  sql.query(
    'Select * from guilds.listings where borrower_id = ANY ($1)',
    [user_id],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('found the listings from user');
        result(null, res);
      }
    }
  );
};
//Return all listings by a certain lender id
Listing.getAllLenderListings = function (user_id, result) {
  sql.query(
    'Select * from guilds.listings where lender_id = ANY ($1)',
    [user_id],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('found the listings from lender');
        result(null, res);
      }
    }
  );
};
//Updates listing to add a borrower
//Takes in user_id and listing_id
Listing.addBorrower = function (ids, result) {
  sql.query(
    'UPDATE guilds.listings SET borrower_id = ($1) where id = ANY ($2)',
    [ids.user_id, ids.listing_id],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        //Input
        //
        console.log('Updated listing to include borrower');
        result(null, res.rows[0].id);
      }
    }
  );
};
// Updates the listing to be marked completed
// Takes in the completed status,time,listing_id
Listing.markCompleted = function (listing, result) {
  sql.query(
    'UPDATE guilds.listings SET completed = ($1), time_sold_expired = ($2) WHERE id = ANY ($3)',
    [listing.completed, listing.time_sold_expired, listing.listing_id],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('Updated listing to include borrower');
        result(null, res.rows[0].id);
      }
    }
  );
};
//Deletes a listing
//Only takes in listing id
Listing.deleteItem = function (listing_id) {
  sql.query(
    "UPDATE guilds.listings SET delete = 'T' where id = ($1)",
    [listing_id],
    function (err, res) {
      if (err) {
        console.log('error deleting item: ', err);
        result(err, null);
      } else {
        console.log('Deleted item');
      }
    }
  );
};
module.exports = {
  Listing,
};
