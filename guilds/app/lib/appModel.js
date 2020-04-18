'use strict';
var sql = require('./db.js').pool;

//User object constructor
var User = function (user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.email = user.email;
  this.phonenum = user.phonenum;
};

var Login = function (login) {
  this.email = login.email;
  this.password = login.password;
  this.reset_pw_tkn = login.reset_pw_tkn;
  this.reset_pw_expires = login.reset_pw_expires;
};
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
var Item = function (item) {
  this.item_name = item.item_name;
  this.item_desc = item.item_desc;
  this.image = item.image;
  this.is_available = item.is_available;
};
Item.createItem = function (item) {
  sql.query(
    'INSERT INTO guilds.item_info (item_name,item_desc,image,is_available) VALUES($1,$2,$3,$4)',
    [item.item_name, item.item_desc, item.item_image, item.is_available],
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
//Create a new listing entry
Listing.createListing = function (listing) {
  console.log('creating new listing', listing),
    sql.query(
      'INSERT INTO guilds.listings(first_name,last_name,email) values($1,$2,$3) RETURNING *',
      [newUser.firstname, newUser.lastname, newUser.email],
      function (err, res) {
        if (err) {
          console.log('error: ', err);
          result(err, null);
        } else {
          console.log(res.rows[0].id);
          result(null, res.rows[0].id);
        }
      }
    );
};
//Return all listings by a certain borrower
Listing.getAllBorrowerListings = function (user_id) {
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
//Return all listings by a certain lender
Listing.getAllLenderListings = function (user_id) {
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
//Create a new login entry
Login.createLogin = function (email, pass, result) {
  //Checking for duplicate emails
  sql.query('SELECT * from guilds.login where email = $1', [email], function (
    err,
    res
  ) {
    console.log('Checking if email ', email, ' exists');
    if (res.rows.length > 0) {
      console.log('Email already exists');
      result(0, null);
    } else {
      console.log('Email is new');
      console.log(pass, email);
      sql.query(
        'INSERT INTO guilds.login (EMAIL,PASSWORD) VALUES ($1,$2) ',
        [email, pass],
        function (err, res) {
          if (err) {
            console.log('error: ', err);
            result(err, null);
          } else {
            console.log(res.rows[0]);
            result(null, res.rows[0]);
          }
        }
      );
    }
  });
};
// Set both reset tokens for a login
Login.forgotPassword = function (reset_info) {
  var curr_date = new Date();
  curr_date.setTime(reset_info.resetPasswordExpires);
  sql.query(
    'UPDATE guilds.login SET reset_pw_tkn =($1), reset_pw_expires =($2) WHERE email =($3) RETURNING *',
    [reset_info.resetPasswordToken, curr_date.toDateString(), reset_info.email],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('completed forgot password');
        console.log(res.rows[0].id);
      }
    }
  );
};
Login.findByToken = function (login_info) {
  var curr_date = new Date();
  curr_date.setTime(login_info.resetPasswordExpires);
  sql.query(
    'Select * from guilds.login where resetPasswordToken = ANY ($1) and resetPasswordExpires > ($2)',
    [login_info.resetPasswordToken, curr_date.toDateString()],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('completed find');
        console.log(res.rows[0].id);
      }
    }
  );
};
Login.findByEmail = function (login_info, result) {
  sql.query(
    'Select * from guilds.login where email = ANY ($1)',
    [login_info],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('completed login find');
        result(null, res);
      }
    }
  );
};
//Updates a user's phone number
User.updateUserPhone = function (User, result) {
  console.log('updating user phone', User);
  sql.query(
    'UPDATE guilds.users SET phonenum=($1) WHERE email = ANY($2)'[
      (User.phonenum, User.email)
    ],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log(res.rows[0].id);
        result(null, res.rows[0].id);
      }
    }
  );
};
//Updates both the user and their login email
User.updateUserEmail = function (User, result) {
  console.log('updating user email', User['email']),
    sql.query(
      'UPDATE guilds.users SET email=($1) WHERE email = ANY($1)',
      [User['email']],
      function (err, res) {
        if (err) {
          console.log('error: ', err);
          result(err, null);
        } else {
          console.log(res.rows[0].id);
          sql.query(
            'UPDATE guilds.login SET email=($1) WHERE email = ANY($1)',
            [User.email],
            function (err, res) {
              if (err) {
                console.log('error: ', err);
                result(err, null);
              } else {
                console.log(res.rows[0].id);
                result(null, res.rows[0].id);
              }
            }
          );
          result(null, res.rows[0].id);
        }
      }
    );
};
//checks for duplicate emails before creating a user
User.createUser = function (newUser, result) {
  console.log('inserting new user now', newUser),
    sql.query(
      'INSERT INTO guilds.users(first_name,last_name,email) values($1,$2,$3) RETURNING *',
      [newUser.firstname, newUser.lastname, newUser.email],
      function (err, res) {
        if (err) {
          console.log('error: ', err);
          result(err, null);
        } else {
          console.log(res.rows[0].id);
          result(null, res.rows[0].id);
        }
      }
    );
};
// finds a user by their email and returns all of their information
User.getUserByEmail = function (email, result) {
  console.log('getting user by email ', email);
  sql.query(
    'Select * from guilds.users where email = ANY ($1)',
    [email],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
User.getAllUsers = function (result) {
  sql.query('Select * from guilds.users', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('Users : ', res.rows);

      result(null, res.rows);
    }
  });
};
User.remove = function (id, result) {
  sql.query('DELETE FROM users WHERE USER_ID = ?', [id], function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = {
  User,
  Login,
  Listing,
  Item,
};
