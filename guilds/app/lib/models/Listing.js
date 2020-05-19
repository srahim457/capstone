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

//Create a new item
//Takes in an item object
//Returns created item id
Listing.createItem = async function (req, res) {
  try {
    console.log('creating item  with ', req[0])
    const listing = await sql.query('INSERT INTO guilds.item_info(item_name,item_desc,image) VALUES($1,$2,$3) RETURNING *', [req[0].item_name, req[0].item_desc, req[0].picture]);
    return listing.rows[0].id
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};

//Listing

//Create a new picture for item
//Takes in an item object
//Returns created item id
Listing.createItemImage = async function (req, res) {
  try {
    const listing = await sql.query('UPDATE guilds.item_info SET image = ($1) WHERE id = ($2) RETURNING *', [req[0].image_picture, req[0].id]);
    return listing.rows[0].id
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};


//Create a new sale listing entry
//Takes in a listing object
//Returns created id
Listing.createSaleListing = async function (req, res) {
  try {
    var d = new Date();
    console.log('creating sale listing with ', req[0])
    const listing = await sql.query('INSERT INTO guilds.listings(item_id,time_posted,total_price,lender_id,completed,expired,type,deleted,reserved) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *', [req[0].item_id, d, req[0].total_price, req[0].lender_id, 'F', 'F', 'sale', 'F', 'F']);
    return listing.rows[0]
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};

//Create a new loan listing entry
//Takes in a listing object
//Returns created listing
Listing.createLoanListing = async function (req, res) {
  try {
    var d = new Date();
    console.log('creating loan listing with ', req[0])
    const listing = await sql.query('INSERT INTO guilds.listings(item_id,time_posted,return_by,policy,lender_id,completed,expired,type,deleted,reserved,insurance_amount) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *', [req[0].item_id, d, req[0].return_by, req[0].policy, req[0].lender_id, 'F', 'F', 'loan', 'F', 'F',req[0].insurance_amount]);
    return listing.rows[0]
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};
//Create a new loan listing entry
//Takes in a listing object
//Returns created listing
Listing.createRentalListing = async function (req, res) {
  try {
    var d = new Date();
    console.log('creating rental listing with ', req[0])
    const listing = await sql.query('INSERT INTO guilds.listings(item_id,time_posted,rent_amount,return_by,policy,lender_id,completed,expired,type,deleted,reserved,insurance_amount) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *', [req[0].item_id, d, req[0].rent_amount, req[0].return_by, req[0].policy, req[0].lender_id, 'F', 'F', 'rental', 'F', 'F',req[0].insurance_amount]);
    return listing.rows[0]
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};

Listing.searchForListing = async function (req, res) {
  try {
    if (req === undefined) {
      console.log('undefined search')
    } else {
      console.log('search for a listing containing ', req)
      const listing = await sql.query("Select I.*,L.* FROM guilds.listings AS L INNER JOIN guilds.item_info AS I ON L.item_id = I.id where completed <> 'T' AND expired <> 'T' AND reserved <> 'T' AND I.item_name LIKE ($1) ORDER by time_posted DESC", ['%' + req + '%']);
      return listing.rows
    }

  } catch (error) {
    console.log(error)
    res.status(400);
  }
};


//Return listing that matches listing id
//Only takes in the listing id as a parameter
Listing.getListingByListingID = async function (req, res) {
  try {
    const listing = await sql.query('Select * from guilds.listings where id =ANY($1)', [req]);
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
    const listing = await sql.query("Select I.*,L.* FROM guilds.listings AS L INNER JOIN guilds.item_info AS I ON L.item_id = I.id where completed <> 'T' AND expired <> 'T' AND reserved <> 'T' AND borrower_id IS NULL ORDER by time_posted DESC");
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
    const listing = await sql.query("Select I.*,L.* FROM guilds.listings AS L INNER JOIN guilds.item_info AS I ON L.item_id = I.id where borrower_id = ($1) AND L.deleted <> 'T' ORDER BY return_by DESC", [req]);
    console.log('number of listings under borrowerid ', req, ' are ', listing.rows.length, '\n')
    return listing.rows
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};
//Return all listings by a certain lender id
//Takes in a lender id
//This became an inner join to avoid a get request per item 5/10
Listing.getAllLenderListings = async function (req, res) {
  try {
    const listing = await sql.query("Select I.*,L.* FROM guilds.listings AS L INNER JOIN guilds.item_info AS I ON L.item_id = I.id where lender_id = ($1) AND L.deleted <> 'T' AND completed <> 'T' ORDER BY L.borrower_id ASC, L.time_posted DESC", [req]);
    console.log('number of listings under lenderid ', req, ' are ', listing.rows.length, '\n')
    return listing.rows
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};
//Return all listings that are marked completed under a user id
//Takes in a user id
Listing.getAllCompletedListings = async function (req, res) {
  try {
    console.log('getting all the completed listings of',req)
    const listing = await sql.query("Select I.*,L.* FROM guilds.listings AS L INNER JOIN guilds.item_info AS I ON L.item_id = I.id where( lender_id = ($1) OR borrower_id = ($1)) AND L.deleted <> 'T' AND completed = 'T' ORDER BY L.borrower_id ASC, L.time_sold_expired DESC", [req]);
    console.log('number of completed listings under lenderid ', req, ' are ', listing.rows.length, '\n')
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
    console.log('added a borrower to listing ', req[0].listing_id, '\n')
    const listing = await sql.query('UPDATE guilds.listings SET borrower_id = ($1),time_borrowed = ($3) WHERE id = ($2) RETURNING *', [req[0].borrower_id, req[0].listing_id, req[0].datecompleted]);
    return listing.rows[0].id
  } catch (error) {
    console.log(error)
    res.status(400);;
  }
};
//Updates listing to remove a borrower
//Takes in just a listing id
//Returns listing id
Listing.removeBorrower = async function (req, res) {
  try {
    const listing = await sql.query('UPDATE guilds.listings SET borrower_id = "null" where id = ($1) RETURNING *', [req]);
    console.log('added a borrower to listing ', req[0].listing_id, '\n')
    return listing.rows[0].id
  } catch (error) {
    console.log(error)
    res.status(400);;
  }
};
//Reserves the listing so it cant be used by two people
//Takes in a listing id only
Listing.reserveListing = async function (req, res) {
  try {
    console.log('marked listing as reserved ', req[0], '\n')
    const listing = await sql.query("UPDATE guilds.listings SET reserved = 'T',reserved_by = ($2) where id = ($1) RETURNING *", [req[0].listing_id, req[0].user_id]);
    return listing.rows[0]
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};

//Unreserves the listing
//Takes in a listing id only
Listing.unreserveListing = async function (req, res) {
  try {
    console.log('marked listing as unreserved ', req[0], '\n')
    const listing = await sql.query("UPDATE guilds.listings SET reserved = 'F',reserved_by = ($2) where id = ($1) RETURNING *", [req[0].listing_id, req[0].user_id]);
    return listing.rows[0]
  } catch (error) {
    console.log(error)
    res.status(400);;
  }
};

//Unreserves the listing
//Takes in a listing id only
Listing.freeListings = async function (req, res) {
  try {
    console.log('unreserving all listings belonging to this ', req.user.id, '\n')
    const listing = await sql.query("UPDATE guilds.listings SET reserved = 'F',reserved_by = (null) where id = ($1) RETURNING *", [req.user.id]);
    return listing.rows[0]
  } catch (error) {
    console.log(error)
    res.status(400);;
  }
};

// Updates the listing to be marked completed
// Takes in the completed status,time,listing_id
// Returns listing id
Listing.markCompletedSale = async function (req, res) {
  try {
    console.log('marking complete', req[0])
    const listing = await sql.query("UPDATE guilds.listings SET completed = 'T', time_sold_expired = ($1) WHERE id = ($2) RETURNING *", [req[0].datecompleted, req[0].listing_id]);
    console.log('marked listing completed \n', listing.rows[0])
    return listing.rows[0]
  } catch (error) {
    console.log(error)
    res.status(400);
  }
};
//After a user rates the transaction mark the item completed
Listing.markCompleted = async function (req, res) {
  try {
    var d = new Date();
    console.log('marking complete after being rated', req,d)
    const listing = await sql.query("UPDATE guilds.listings SET completed = 'T', time_sold_expired = ($2) WHERE item_id = ($1) RETURNING *", [req,d]);
    console.log('marked listing completed after rating \n', listing.rows[0])
    return listing.rows[0]
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
    var d = new Date()
    console.log('deleting a listing with item id',req)
    const listing = await sql.query("UPDATE guilds.listings SET deleted = 'T',expired = 'T' WHERE item_id = ($1) RETURNING *",req);
    console.log('Deleted listing \n ',listing.rows)
    return listing.rows
  } catch (error) {
    console.log(error)
    res.status(400)
  }
};
module.exports = {
  Listing,
};
