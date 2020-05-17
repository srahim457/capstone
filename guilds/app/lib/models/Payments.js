'use strict';
var sql = require('../db').pool;
var fromUnixTime = require('date-fns/fromUnixTime')
var Listing = require('../models/Listing').Listing;


//Payment object constructor
var Payment = function (payment) {
    this.method = payment.name;
};


//Takes in a guilds object)
//creates the guilds in the database
//Returns the whole guilds entry
Payment.newPayment = async function (req, res) {
    try {
        console.log('inserting new payment now \n ',req[0])
        //const payment= await sql.query("INSERT INTO guilds.payments(method,user_id,listing_id,date_processed,processed) values($1,$2,$3,$4,$5) RETURNING *", ['skripe',req[0].user_id,req[0].listing_id,d,'T'])
        //console.log(payment.rows[0],'\n result')
        //return payment.rows[0]
        if(req[0].charge.status == 'succeeded'){        
            const payment= await sql.query("INSERT INTO guilds.payments(user_id,listing_id,date_processed,processed,stripe_info,method) values($1,$2,$3,$4,$5,$6) RETURNING *", [req[0].borrower_id,req[0].listing_id,fromUnixTime(req[0].charge.created),'T',req[0].charge,req[0].charge.payment_method_details.type])
            var listinginfo = {
                completed: 'T',
                datecompleted: fromUnixTime(req[0].charge.created),
                listing_id: req[0].listing_id
            }
            const completeListing = await Listing.markCompletedSale([listinginfo],res)
            console.log(payment.rows.length, completeListing.rows)
        }
        else{
            res.status(400).send('Payment failed')
        }

    } catch (error) {
        console.log(error);
        res.status(400);
    }
};

module.exports = {
    Payment
}