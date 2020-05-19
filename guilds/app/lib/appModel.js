// 'use strict';
// var sql = require('./db.js').pool;

// //User object constructor
// var User = function (user) {
//   this.firstname = user.firstname;
//   this.lastname = user.lastname;
//   this.email = user.email;
//   this.phonenum = user.phonenum;
// };

// var Login = function (login) {
//   this.email = login.email;
//   this.password = login.password;
//   this.reset_pw_tkn = login.reset_pw_tkn;
//   this.reset_pw_expires = login.reset_pw_expires;
// };
// var Listing = function (listing) {
//   this.time_posted = listing.time_posted;
//   this.time_sold_expired = listing.time_sold_expired;
//   this.total_price = listing.total_price;
//   this.rent_amount = listing.rent_amount;
//   this.insurance_amount = listing.insurance_amount;
//   this.lender_id = listing.lender_id;
//   this.borrower_id = listing.borrower_id;
//   this.completed = listing.completed;
//   this.expired = listing.expired;
// };
// var Item = function (item) {
//   this.item_name = item.item_name;
//   this.item_desc = item.item_desc;
//   this.image = item.image;
//   this.is_available = item.is_available;
// };

// // @Item

// //Creates a new item entry
// //Returns item id
// Item.createItem = function (item, result) {
//   sql.query(
//     'INSERT INTO guilds.item_info (item_name,item_desc,image,is_available) VALUES($1,$2,$3,$4)',
//     [item.item_name, item.item_desc, item.item_image, item.is_available],
//     function (err, res) {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//       } else {
//         console.log('created item');
//         result(null, res.rows[0].id);
//       }
//     }
//   );
// };
// //Return item that matches item id
// Item.getItemByID = function (item_id, result) {
//   sql.query(
//     'Select * from guilds.item_info where item_id = ANY ($1)',
//     [item_id],
//     function (err, res) {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//       } else {
//         console.log('found the item ');
//         result(null, res);
//       }
//     }
//   );
// };
// //Updates an item's information (name,desc,image)
// //Returns new item ID
// Item.updateItemInformation = function (item, result) {
//   console.log('updating item information', item);
//   sql.query(
//     'UPDATE guilds.item_info SET item_name=($1), item_desc =($2),image = ($3) WHERE item_id = ($4)',
//     [item.item_name, item.item_desc, item.item_image, item.id]
//   );
//   Item.createItem(item, function (err, res) {
//     if (err) {
//       console.log('error updating item information: ', err);
//       result(err, null);
//     } else {
//       console.log(res.rows[0].id);
//       result(null, res.rows[0].id);
//     }
//   });
// };
// //Sets the items availability
// Item.updateAvailability = function (item, result) {
//   console.log('updating item Availability', item);
//   sql.query(
//     'UPDATE guilds.item_info SET is_available=($1) WHERE item_id = ($2)',
//     [item.is_available, item.id]
//   );
//   Item.createItem(item, function (err, res) {
//     if (err) {
//       console.log('error updating item information: ', err);
//       result(err, null);
//     } else {
//       console.log(res.rows[0].id);
//       result(null, res.rows[0].id);
//     }
//   });
// };
// //"Deletes" item
// //Takes in only item id
// Item.deleteItem = function (item_id) {
//   sql.query(
//     "UPDATE guilds.item_info SET delete = 'T' where id = ($1)",
//     [item_id],
//     function (err, res) {
//       if (err) {
//         console.log('error deleting item: ', err);
//         result(err, null);
//       } else {
//         console.log('Deleted item');
//       }
//     }
//   );
// };

// // @Listing

// //Create a new listing entry
// //Returns listing id
// Listing.createListing = function (listing, result) {
//   console.log('creating new listing w/', listing),
//     sql.query(
//       'INSERT INTO guilds.listings(item_id,time_posted,total_price,rent_amount,insurance_amount,lender_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
//       [
//         listing.item_id,
//         listing.time_posted,
//         listing.total_price,
//         listing.rent_amount,
//         listing.insurance_amount,
//         listing.lender_id,
//       ],
//       function (err, res) {
//         if (err) {
//           console.log('error: ', err);
//           result(err, null);
//         } else {
//           console.log(res.rows[0]);
//           result(null, res.rows[0].id);
//         }
//       }
//     );
// };
// //Return listing that matches listing id
// //Only takes in the listing id as a parameter
// Listing.getListingByID = function (listing_id, result) {
//   sql.query(
//     'Select * from guilds.listings where id = ANY ($1)',
//     [listing_id],
//     function (err, res) {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//       } else {
//         console.log('found the listing');
//         result(null, res);
//       }
//     }
//   );
// };
// //Return all listings by a certain borrower id
// Listing.getAllBorrowerListings = function (user_id, result) {
//   sql.query(
//     'Select * from guilds.listings where borrower_id = ANY ($1)',
//     [user_id],
//     function (err, res) {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//       } else {
//         console.log('found the listings from user');
//         result(null, res);
//       }
//     }
//   );
// };
// //Return all listings by a certain lender id
// Listing.getAllLenderListings = function (user_id, result) {
//   sql.query(
//     'Select * from guilds.listings where lender_id = ANY ($1)',
//     [user_id],
//     function (err, res) {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//       } else {
//         console.log('found the listings from lender');
//         result(null, res);
//       }
//     }
//   );
// };
// //Updates listing to add a borrower
// //Takes in user_id and listing_id
// Listing.addBorrower = function (ids, result) {
//   sql.query(
//     'UPDATE guilds.listings SET borrower_id = ($1) where id = ANY ($2)',
//     [ids.user_id, ids.listing_id],
//     function (err, res) {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//       } else {
//         //Input
//         //
//         console.log('Updated listing to include borrower');
//         result(null, res.rows[0].id);
//       }
//     }
//   );
// };
// // Updates the listing to be marked completed
// // Takes in the completed status,time,listing_id
// Listing.markCompleted = function (listing, result) {
//   sql.query(
//     'UPDATE guilds.listings SET completed = ($1), time_sold_expired = ($2) WHERE id = ANY ($3)',
//     [listing.completed, listing.time_sold_expired, listing.listing_id],
//     function (err, res) {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//       } else {
//         console.log('Updated listing to include borrower');
//         result(null, res.rows[0].id);
//       }
//     }
//   );
// };
// //Deletes a listing
// //Only takes in listing id
// Listing.deleteItem = function (listing_id) {
//   sql.query(
//     "UPDATE guilds.listings SET delete = 'T' where id = ($1)",
//     [listing_id],
//     function (err, res) {
//       if (err) {
//         console.log('error deleting item: ', err);
//         result(err, null);
//       } else {
//         console.log('Deleted item');
//       }
//     }
//   );
// };
// //@Login

// //Create a new login entry
// //Returns the whole login entry
// Login.createLogin = function (email, pass, result) {
//   //Checking for duplicate emails
//   sql.query('SELECT * from guilds.login where email = $1', [email], function (
//     err,
//     res
//   ) {
//     console.log('Checking if email ', email, ' exists');
//     if (res.rows.length > 0) {
//       console.log('Email already exists');
//       result(0, null);
//     } else {
//       console.log('Email is new');
//       console.log(pass, email);
//       sql.query(
//         'INSERT INTO guilds.login (EMAIL,PASSWORD) VALUES ($1,$2) ',
//         [email, pass],
//         function (err, res) {
//           if (err) {
//             console.log('error: ', err);
//             result(err, null);
//           } else {
//             console.log(res.rows[0]);
//             result(null, res.rows[0]);
//           }
//         }
//       );
//     }
//   });
// };
// // Set both reset tokens for a login
// // Returns login id
// Login.forgotPassword = function (reset_info) {
//   var curr_date = new Date();
//   curr_date.setTime(reset_info.resetPasswordExpires);
//   sql.query(
//     'UPDATE guilds.login SET reset_pw_tkn =($1), reset_pw_expires =($2) WHERE email =($3) RETURNING *',
//     [reset_info.resetPasswordToken, curr_date.toDateString(), reset_info.email],
//     function (err, res) {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//       } else {
//         console.log('completed forgot password');
//         console.log(res.rows[0].id);
//       }
//     }
//   );
// };
// //Return login entry
// Login.findByToken = function (login_info, result) {
//   var curr_date = new Date();
//   curr_date.setTime(login_info.resetPasswordExpires);
//   sql.query(
//     'Select * from guilds.login where resetPasswordToken = ANY ($1) and resetPasswordExpires > ($2)',
//     [login_info.resetPasswordToken, curr_date.toDateString()],
//     function (err, res) {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//       } else {
//         console.log('completed token find');
//         console.log(res.rows[0]);
//         result(null, res);
//       }
//     }
//   );
// };
// //Return login entry
// Login.findByEmail = function (login_info, result) {
//   sql.query(
//     'Select * from guilds.login where email = ANY ($1)',
//     [login_info],
//     function (err, res) {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//       } else {
//         console.log('completed login find');
//         result(null, res);
//       }
//     }
//   );
// };

// //@User

// //Updates a user's phone number
// //Returns user id
// User.updateUserPhone = function (User, result) {
//   console.log('updating user phone', User);
//   sql.query(
//     'UPDATE guilds.users SET phonenum=($1) WHERE email = ANY($2)'[
//       (User.phonenum, User.email)
//     ],
//     function (err, res) {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//       } else {
//         console.log(res.rows[0].id);
//         result(null, res.rows[0].id);
//       }
//     }
//   );
// };
// //Updates both the user and their login email
// //Returns user id
// User.updateUserEmail = function (User, result) {
//   console.log('updating user email', User['email']),
//     sql.query(
//       'UPDATE guilds.users SET email=($1) WHERE email = ANY($1)',
//       [User['email']],
//       function (err, res) {
//         if (err) {
//           console.log('error: ', err);
//           result(err, null);
//         } else {
//           console.log(res.rows[0].id);
//           sql.query(
//             'UPDATE guilds.login SET email=($1) WHERE email = ANY($1)',
//             [User.email],
//             function (err, res) {
//               if (err) {
//                 console.log('error: ', err);
//                 result(err, null);
//               } else {
//                 console.log(res.rows[0].id);
//                 result(null, res.rows[0].id);
//               }
//             }
//           );
//           result(null, res.rows[0].id);
//         }
//       }
//     );
// };
// //checks for duplicate emails before creating a user
// //Returns the whole user entry
// User.createUser = function (newUser, result) {
//   console.log('inserting new user now', newUser),
//     sql.query(
//       'INSERT INTO guilds.users(first_name,last_name,email) values($1,$2,$3) RETURNING *',
//       [newUser.firstname, newUser.lastname, newUser.email],
//       function (err, res) {
//         if (err) {
//           console.log('error: ', err);
//           result(err, null);
//         } else {
//           console.log(res.rows[0]);
//           result(null, res.rows[0]);
//         }
//       }
//     );
// };
// // finds a user by their email and returns all of their information
// // Returns user entry
// User.getUserByEmail = function (email, result) {
//   console.log('getting user by email ', email);
//   sql.query(
//     'Select * from guilds.users where email = ANY ($1)',
//     [email],
//     function (err, res) {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//       } else {
//         result(null, res);
//       }
//     }
//   );
// };
// // TODO: Convert to prepared statements
// User.getAllUsers = function (result) {
//   sql.query('Select * from guilds.users', function (err, res) {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//     } else {
//       console.log('Users : ', res.rows);

//       result(null, res.rows);
//     }
//   });
// };
// // TODO: Convert to prepared statements and change to new "Delete"
// User.deleteremove = function (id, result) {
//   sql.query('DELETE FROM users WHERE USER_ID = ?', [id], function (err, res) {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//     } else {
//       result(null, res);
//     }
//   });
// };

// module.exports = {
//   User,
//   Login,
//   Listing,
//   Item,
// };
