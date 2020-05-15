'use strict';
var sql = require('../db').pool;

//User object constructor
var User = function (user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.email = user.email;
  this.phonenum = user.phonenum;
};
//User

//Updates a User's rating
//Takes a user id and a rating
//Returns the user row
User.updateRating = async function (req, res) {
  try {
    const user = await sql.query(
      'UPDATE guilds.users SET rating=($2) WHERE user_id = ($1) RETURNING *',
      [req[0].userid, req[0].rating]
    );
    console.log('updated user rating \n');
    return user.rows[0];
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
//Updates a User's dominion
//Takes a user id and a dominion id
//Returns the user row
User.updateDominion = async function (req, res) {
  try {
    const user = await sql.query(
      'UPDATE guilds.users SET dominion_id=($2) WHERE user_id = ($1) RETURNING *',
      [req[0].userid, req[0].dominionid]
    );
    console.log('updated user dominon \n');
    return user.rows[0];
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
/*
//Updates a User's information
//Takes a user object
//Returns the user row
User.updateUserInformation = async function (req, res) {
  try {
    const user = await sql.query(
      'UPDATE guilds.users SET first_name=($2), last_name =($3),username = ($4),phonenum = ($5), description = ($6), dominion_id = ($7) WHERE user_id = ($1)RETURNING *',
      [
        req[0].id,
        // req[0].first_name,
        // req[0].last_name,
        // req[0].username,
        req[0].phonenum,
        req[0].description,
        req[0].dominion_id,
      ]
    );
    console.log('updated user information ', req[0], user.rows.length);
    return user.rows[0];
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
*/

//Updates a User's information
//Takes a user object
//Returns the user row
User.updateUserInformation = async function (req, res) {
  try {
    console.log(req[0], '  request !! ');
    const user = await sql.query(
      'UPDATE guilds.users SET phonenum=($2), description =($3) WHERE id = ($1)RETURNING *',
      [
        req[0].id,
        // req[0].first_name,
        // req[0].last_name,
        // req[0].username,
        req[0].phonenum,
        req[0].description,
        //req[0].dominion_id,
      ]
    );
    console.log('updated user information ', req[0], user.rows.length);
    return user.rows[0];
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

// Updates user email used
// Takes array of old_email and new_email
// MUST UPDATE LOGIN EMAIL FIRST
// Returns the user row
User.updateEmail = async function (req, res) {
  try {
    const user = await sql.query(
      'UPDATE guilds.users SET email=($2) WHERE email = ($1) RETURNING *',
      [req[0].old_email, req[0].new_email]
    );
    return user.rows[0];
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

// Updates user profile picture
// Takes array of new_picture and user id
// Returns the user row
User.updateProfilePicture = async function (req, res) {
  try {
    const user = await sql.query(
      'UPDATE guilds.users SET profile_picture = ($2) WHERE id = ($1) RETURNING *',
      [req[0].id, req[0].profile_picture]
    );
    console.log(req[0].profile_picture, 'this is the profile path!!!!!!!!!!!!');
    return user.rows[0];
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
//Takes in a user object
//creates the user in the database
//Returns the whole user entry
User.createUser = async function (req, res) {
  try {
    var d = new Date();
    console.log('inserting new user now \n');
    const username = req[0].firstname +' ' + req[0].lastname;
    const userentry = await sql.query(
      'INSERT INTO guilds.users(first_name,last_name,email,username,creation_date) values($1,$2,$3,$4,$5) RETURNING *',
      [req[0].firstname, req[0].lastname, req[0].email,username, d]
    );
    return userentry.rows;
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
//Returns the id of the last entered user
User.getLastEnteredUser = async function (req, res) {
  try {
    console.log('getting last entered user now \n');
    const user = await sql.query(
      'SELECT * from guilds.users order by id DESC limit 1'
    );
    return user.rows[0].id;
  } catch (error) {
    res.status(400);
  }
};
//Gets the information of the user
//Takes the user ID
//Returns the user entry

User.getUserById = async function (req, res) {
  try {
    console.log('getting user by id', req);
    const user = await sql.query(
      'Select * from guilds.users where id = ANY($1)',
      [req]
    );
    console.log('user found by id ', req, user.rows.length);
    return user.rows;
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
// finds a user by their email and returns all of their information
// Returns user entry
User.getUserByEmail = async function (req, res) {
  try {
    const user = await sql.query(
      'Select * from guilds.users where email =ANY($1)',
      [req]
    );
    console.log('user found with info ', req, user.rows.length);
    return user.rows;
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
User.searchForUser = async function (req, res) {
  try {
    if(req === undefined){
      console.log('undefined search')
  }
    const users = await sql.query(
      'Select * from guilds.users where username LIKE ($1)',
      ['%' +req + '%']
    );
    console.log('user found with usernames like  ', req, users.rows.length);
    return users.rows;
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
//Sets a user online
//Take a whole user object
//Returns the user entry
User.online = async function (req, res) {
  try {
    console.log('Setting user online \n', req[0].id);
    const stat = await sql.query(
      "UPDATE guilds.users SET online= 'T' WHERE id =($1) RETURNING *",
      [req[0].id]
    );
    console.log('user set online');
    return stat.rows[0];
  } catch (error) {
    console.log('error updating user online status: ', error);
    res.status(400);
  }
};
//Sets a user offline
//Take a whole user object
//Returns user entry
User.offline = async function (req, res) {
  try {
    console.log('Setting user online \n', req[0].id);
    const stat = await sql.query(
      "UPDATE guilds.users SET online= 'F' WHERE id =($1) RETURNING *",
      [req[0].id]
    );
    console.log('user set offline');
    return stat.rows[0];
  } catch (error) {
    console.log('error updating user online status: ', error);
    res.status(400);
  }
};
//Delete a user by setting delete flag
//Take a user id
//Returns user entry
User.delete = async function (req, res) {
  try {
    const user = await sql.query(
      "UPDATE guilds.users SET deleted= 'T' WHERE id =($1) RETURNING *",
      [req]
    );
    console.log(' deleted user \n');
    return user.rows[0];
  } catch (error) {
    res.status(400);
  }
};

module.exports = {
  User,
};
