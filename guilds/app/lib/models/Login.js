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
    console.log('checking for login \n');
    if (login.rows.length === 0) {
      const createlogin = await sql.query(
        'INSERT INTO guilds.login (EMAIL,PASSWORD) VALUES ($1,$2) RETURNING *',
        [req[0].email, req[0].pwd]
      );
      console.log('created login', createlogin.rows);
      return createlogin.rows;
    }
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
// Updates login email used
// Takes array of old_email and new_email
// Returns login entry
Login.updateEmail = async function (req, res) {
  try {
    const login = await sql.query(
      'UPDATE guilds.login SET email =($2) WHERE email = ($1) RETURNING *',
      [req[0].old_email, req[0].new_email]
    );
    console.log('updating login to new email \n', login.rows.length);
    return login.rows;
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
// Update login password used
// Takes new password and email
// Returns login entry
Login.updatePassword = async function (req, res) {
  try {
    const login = await sql.query(
      'UPDATE guilds.login SET password =($2) WHERE email = ($1) RETURNING *',
      [req[0].email, req[0].new_password]
    );
    console.log('Updated login password \n');
    return login.rows;
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
// Set both reset tokens for a login
// Takes resetPasswordToken and email
// Returns login id
Login.forgotPassword = async function (req, res) {
  try {
    var curr_date = new Date();
    curr_date.setTime(req.resetPasswordExpires);
    const login = await sql.query(
      'UPDATE guilds.login SET reset_pw_tkn =($1), reset_pw_expires =($2) WHERE email =($3) RETURNING *',
      [req.resetPasswordToken, curr_date.toDateString(), req[0].email]
    );
    console.log('set reset pw and reset pw expire token \n');
    return login.rows[0].id;
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
// Return login entry
// Takes resetToken and resetExpire
Login.findByToken = async function (req, res) {
  try {
    var curr_date = new Date();
    curr_date.setTime(login_info.resetPasswordExpires);
    const login = await sql.query(
      'Select * from guilds.login where resetPasswordToken = ($1) and resetPasswordExpires > ($2)',
      [req[0].resetPasswordToken, curr_date.toDateString()]
    );
    console.log('found login with token \n');
    return login.rows;
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

//Return login entry
//Takes email
Login.getUserByEmail = async function (req, res) {
  try {
    const user = await sql.query(
      'Select * from guilds.login where email =ANY($1)',
      [req]
    );
    console.log('user found with info ', req, user.rows.length);
    return user.rows;
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

module.exports = {
  Login,
};
