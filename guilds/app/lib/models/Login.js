'use strict';
var sql = require('../db').pool;

var Login = function (login) {
  this.email = login.email;
  this.password = login.password;
  this.reset_pw_tkn = login.reset_pw_tkn;
  this.reset_pw_expires = login.reset_pw_expires;
};
//Login

//Create a new login entry
//Returns the whole login entry
Login.createLogin = async function (req, res) {
  //Checking for duplicate emails
  try {
    console.log('creating login', req[0].email);
    const login = await sql.query(
      'SELECT * from guilds.login where email = $1',
      [req[0].email]
    );
    console.log('checking for login', login.rows);
    if (login.rows.length === 0) {
      const createlogin = await sql.query(
        'INSERT INTO guilds.login (EMAIL,PASSWORD) VALUES ($1,$2) RETURNING *',
        [req[0].email, req[0].pwd]
      );
      console.log('created login', createlogin.rows);
      return createlogin.rows;
    }
  } catch (error) {
    res.sendStatus(400);
  }
};
// Set both reset tokens for a login
// Returns login id
Login.forgotPassword = function (req, res) {
  var curr_date = new Date();
  curr_date.setTime(req.resetPasswordExpires);
  sql.query(
    'UPDATE guilds.login SET reset_pw_tkn =($1), reset_pw_expires =($2) WHERE email =($3) RETURNING *',
    [req.resetPasswordToken, curr_date.toDateString(), req.email],
    function (err, resp) {
      if (err) {
        console.log('error updating login ', err);
        res.status(400);
      } else {
        res.status(200).send(resp.rows[0]);
      }
    }
  );
};
//Return login entry
Login.findByToken = function (req, res) {
  var curr_date = new Date();
  curr_date.setTime(login_info.resetPasswordExpires);
  sql.query(
    'Select * from guilds.login where resetPasswordToken = ($1) and resetPasswordExpires > ($2)',
    [req.resetPasswordToken, curr_date.toDateString()],
    function (err, resp) {
      if (err) {
        console.log('error finding login ', err);
        res.status(400);
      } else {
        res.status(200).send(resp.rows[0]);
      }
    }
  );
};
//Return login entry
// Login.findByEmail = async function (req, res) {
//   await sql.query(
//     'Select * from guilds.login where email = ($1)',
//     [login_info],
//     function (err, resp) {
//       if (err) {
//         console.log('error finding login by email ', err);
//         res.status(400);
//       } else {
//         res.status(200).send(resp.rows[0]);
//       }
//     }
//   );
// };
Login.getUserByEmail = async function (req, res) {
  try {
    const user = await sql.query(
      'Select * from guilds.login where email =ANY($1)',
      [req]
    );
    console.log('user found with info ', req, user.rows.length);
    return user.rows;
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports = {
  Login,
};
