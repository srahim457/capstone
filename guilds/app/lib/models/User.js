'use strict';
var sql = require('../db').pool;

//User object constructor
var User = function(user){
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.phonenum = user.phonenum;
};
//User

//Updates a User's rating
//Takes a user id and a rating
//Returns a 200 if ok, 400 if error
User.updateRating = function (req,res) {
    console.log('updating user rating \n')
    sql.query("UPDATE guilds.users SET rating=($2) WHERE user_id = ($1)",[req.userid,req.rating], function (err,resp){            
      if(err) {
        console.log("error updating user rating ", err);
        res.status(400);
      } else{
        res.sendStatus(200);
    }
  });          
}
//Updates a User's dominion
//Takes a user id and a dominion id
//Returns a 200 if ok, 400 if error
User.updateDominion = function (req,res) {
    console.log('updating user dominon \n')
    sql.query("UPDATE guilds.users SET dominion_id=($2) WHERE user_id = ($1)",[req.userid,req.dominionid], function (err,resp){            
      if(err) {
        console.log("error updating user dominion ", err);
        res.status(400);
      } else{
        res.sendStatus(200);
    }
  });          
}
//Updates a User's information
//Takes a user object
//Returns a 200 and user row if ok, 400 if error  
User.updateUserInformation = function (req,result) {
    console.log('updating user information \n')
    sql.query("UPDATE guilds.users SET first_name=($2), last_name =($3),username = ($4),phonenum = ($5), description = ($6), dominion_id = ($7) WHERE user_id = ($1)",[req.id,req.first_name,req.last_name,req.username,req.phonenum,req.description,req.dominion_id], function (err,resp){            
      if(err) {
        console.log("error updating user information", err);
        res.status(400);
      } else{
        res.status(200).send(resp.rows[0]);
    }
  });          
}
//Takes in a user object
//creates the user in the database
//Returns the whole user entry
User.createUser = async function (req, res) {
  try {
    var d = new Date();
    console.log('inserting new user now \n')
    const userentry = await sql.query("INSERT INTO guilds.users(first_name,last_name,email,creation_date) values($1,$2,$3,$4) RETURNING *",[req[0].firstname,req[0].lastname,req[0].email,d.toDateString()])
    return userentry.rows
  } catch (error) {
    res.sendStatus(400)    
  }    
}
//Returns the id of the last entered user
User.getLastEnteredUser = function (req,res) {
    console.log('getting last entered user'),
    sql.query("SELECT * from guilds.users order by id DESC limit 1",function (err, resp) {
      if(err) {
        console.log("error getting last entered user", err);
        res.status(400);
      } else{
        res.status(200).send(resp.rows[0].id);
    }
  });          
}
//Gets the information of the user
//Takes the user ID
//Returns the user entry

User.getUserById = async function (req, res) {
  try {
    console.log('getting user by id', req)
    const user = await sql.query("Select * from guilds.users where id = ANY($1)", [req]);      
    console.log('user found by id ',req,user.rows.length)
    return user.rows  
  } catch (error) {
    res.sendStatus(400)
  }
};
// finds a user by their email and returns all of their information
// Returns user entry
User.getUserByEmail = async function (req, res) {
  try {
    const user = await sql.query("Select * from guilds.users where email =ANY($1)", [req]);
    console.log('user found with info ',req, user.rows.length)
    return user.rows 
  } catch (error) {
    res.sendStatus(400)
  }    
};
//Sets a user online
//Take a whole user object
//Returns 200 for ok
User.online = function (req, res) {
    console.log('Setting user online \n')
    sql.query("UPDATE guilds.users SET online= 'T' WHERE id =ANY($1)",[req.id],function (err,resp){            
            if(err) {
                console.log("error updating user online status: ", err);
                res.status(400);
            }
            else{
                res.sendStatus(200);
            }
        });           
}
//Sets a user offline
//Take a whole user object
User.offline = function (req, res) {
    console.log('Setting user offline \n ')
    sql.query("UPDATE guilds.users SET online= 'F' WHERE id =($1)",[req.id],function (err,resp){            
            if(err) {
                console.log("error updating user online status: ", err);
                res.status(400);
            }
            else{
                res.sendStatus(200);
            }
        });           
}
//Delete a user by setting delete flag
//Take a whole user object
User.delete = function(req, res){
    sql.query("UPDATE guilds.users SET deleted= 'T' WHERE id =($1)",[req.id], function (err, resp) {
      if(err) {
        console.log("error deleting user: ", err);
        res.status(400);
    }
    else{
        res.sendStatus(200);
    }
  });           
}

module.exports= {
    User
}