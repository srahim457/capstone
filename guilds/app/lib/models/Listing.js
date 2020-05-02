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
//Takes in a listing object
//Returns listing id
Listing.createListing = async function (req, res) {
  try {
    var d = new Date();
    const listing = await sql.query('INSERT INTO guilds.listings(item_id,time_posted,total_price,rent_amount,insurance_amount,lender_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *', [req[0].item_id, d, req[0].total_price, req[0].rent_amount, req[0].insurance_amount, req[0].lender_id]);
    return listing.rows[0].id
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};
//Return listing that matches listing id
//Only takes in the listing id as a parameter
Listing.getListingByListingID = async function (req, res) {
  try {
    const listing = await sql.query('Select * from guilds.listings where id =($1)', [req]);
    console.log('Listing found by listing id ', req, listing.rows.length)
    return listing.rows
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};
//Return all listings that are not marked completed in date descending order
// Shows the newests listings first 
Listing.getAllActiveListings = async function (req, res) {
  try {
    const listing = await sql.query("Select * from guilds.listings where completed <> 'F' AND expired <> 'T' ORDER by date DESC");
    console.log('number of active listings are ', listing.rows.length, '\n')
    return listing.rows
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};
//Returns every single listing ever
Listing.getEveryListing = async function (req, res) {
  try {
    const listing = await sql.query("Select * from guilds.listings");
    console.log('number of total listings are ', listing.rows.length, '\n')
    return listing.rows
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};
//Return all listings by a certain borrower id
//Takes in a borrower id
Listing.getAllBorrowerListings = async function (req, res) {
  try {
    const listing = await sql.query('Select * from guilds.listings where borrower_id = ($1)', [req]);
    console.log('number of listings under borrowerid ', req, ' are ', listing.rows.length, '\n')
    return listing.rows
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};
//Return all listings by a certain lender id
//Takes in a lender id
Listing.getAllLenderListings = async function (req, res) {
  try {
    const listing = await sql.query('Select * from guilds.listings where lender_id = ($1)', [req]);
    console.log('number of listings under lenderid ', req, ' are ', listing.rows.length, '\n')
    return listing.rows
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};
//Updates listing to add a borrower
//Takes in user_id and listing_id
//Returns listing id
Listing.addBorrower = async function (req, res) {
  try {
    const listing = await sql.query('UPDATE guilds.listings SET borrower_id = ($1) where id = ($2)', [req[0].user_id, req[0].listing_id]);
    console.log('added a borrower to listing ', req[0].listing_id, '\n')
    return listing.rows[0].id
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};
// Updates the listing to be marked completed
// Takes in the completed status,time,listing_id
// Returns listing id
Listing.markCompleted = async function (req, res) {
  try {
    const listing = await sql.query('UPDATE guilds.listings SET completed = ($1), time_sold_expired = ($2) WHERE id = ($3)', [req[0].completed, req[0].time_sold_expired, req[0].listing_id]);
    console.log('marked listing completed \n')
    return listing.rows[0].id
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};
//Deletes a listing
//Only takes in listing id
//Returns listing entry
Listing.delete = async function (req, res) {
  try {
    const listing = await sql.query("UPDATE guilds.listings SET delete = 'T' where id = ($1)" [req]);
    console.log('Deleted listing \n ')
    return listing
  } catch (error) {
    res.status(400)
  }
};
module.exports = {
  Listing,
};