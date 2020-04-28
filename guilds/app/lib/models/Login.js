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
Login.createLogin = function (req, res) {
  //Checking for duplicate emails
  sql.query('SELECT * from guilds.login where email = $1', [req.email], function (
    err,
    resp
  ) {
    console.log('Checking if email ', req.email, ' exists');
    if (resp.rows.length > 0) {
      console.log('Email already exists');
      result(0, null);
    } else {
      console.log('Email is new');
      console.log(req.pass, req.email);
      sql.query(
        'INSERT INTO guilds.login (EMAIL,PASSWORD) VALUES ($1,$2) ',
        [req.email, req.pass],
        function (err, respon) {
          if (err) {
            console.log("error inserting login ", err);
            res.status(400);
          } else {
            res.status(200).send(respon.rows[0]);
          }
        }
      );
    }
  });
};
// Set both reset tokens for a login
// Returns login id
Login.forgotPassword = function (req,res) {
  var curr_date = new Date();
  curr_date.setTime(req.resetPasswordExpires);
  sql.query(
    'UPDATE guilds.login SET reset_pw_tkn =($1), reset_pw_expires =($2) WHERE email =($3) RETURNING *',
    [req.resetPasswordToken, curr_date.toDateString(), req.email],
    function (err, resp) {
      if (err) {
        console.log("error updating login ", err);
        res.status(400);
      } else {
        res.status(200).send(resp.rows[0]);
      }
    }
  );
};
//Return login entry
Login.findByToken = function (req,res) {
  var curr_date = new Date();
  curr_date.setTime(login_info.resetPasswordExpires);
  sql.query(
    'Select * from guilds.login where resetPasswordToken = ($1) and resetPasswordExpires > ($2)',
    [req.resetPasswordToken, curr_date.toDateString()],
    function (err, resp) {
      if (err) {
        console.log("error finding login ", err);
        res.status(400);
      } else {
        res.status(200).send(resp.rows[0]);
      }
    }
  );
};
//Return login entry
Login.findByEmail = function (req,res) {
  sql.query(
    'Select * from guilds.login where email = ($1)',
    [login_info],
    function (err, resp) {
      if (err) {
        console.log("error finding login by email ", err);
        res.status(400);
      } else {
        res.status(200).send(resp.rows[0]);
      }
    }
  );
};

module.exports = {
  Login,
};
