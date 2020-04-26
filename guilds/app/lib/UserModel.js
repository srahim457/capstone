'use strict';
var sql = require('./db.js').pool;

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
//Returns the user ID   
User.updateRating = function (userid,rating,result) {
    console.log('updating user rating \n')
    sql.query("UPDATE guilds.users SET rating=($2) WHERE user_id = ($1)",[userid,rating], function (err,res){            
            if(err) {
                console.log("error updating rating:", err);
                result(err, null);
            }
            else{
                console.log(res.rows[0].id);
                result(null, res.rows[0].id);
            }
        });           
}
//Updates a User's dominion
//Takes a user id and a dominion id
//Returns user id
User.updateDominion = function (userid,dominionid, result) {
    console.log('updating user dominon \n')
    sql.query("UPDATE guilds.users SET dominion_id=($2) WHERE user_id = ($1)",[userid,dominionid], function (err,res){            
            if(err) {
                console.log("error updating dominion:", err);
                result(err, null);
            }
            else{
                console.log(res.rows[0].id);
                result(null, res.rows[0].id);
            }
        });           
}
//Updates a User's information
//Takes a user object
//Returns the user ID   
User.updateUserInformation = function (user,result) {
    console.log('updating user information \n')
    sql.query("UPDATE guilds.users SET first_name=($2), last_name =($3),username = ($4),phonenum = ($5), description = ($6), dominion_id = ($7) WHERE user_id = ($1)",[user.id,user.first_name,user.last_name,user.username,user.phonenum,user.description,user.dominion_id], function (err,res){            
            if(err) {
                console.log("error updating user information: ", err);
                result(err, null);
            }
            else{
                console.log(res.rows[0].id);
                result(null, res.rows[0].id);
            }
        });           
}
//Takes in a user object
//creates the user in the database
//Returns the whole user entry
User.createUser = function (newUser, result) {
    var d = new Date();
    console.log('inserting new user now',newUser),
    sql.query("INSERT INTO guilds.users(first_name,last_name,email,creation_date) values($1,$2,$3,$4) RETURNING *",[newUser.firstname,newUser.lastname,newUser.email,d.toDateString()], function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.rows[0]);
                result(null, res.rows[0]);
            }
        });           
};
//Returns the id of the last entered user
User.getLastEnteredUser = function (result) {
    console.log('getting last entered user'),
    sql.query("SELECT * from guilds.users order by id DESC limit 1",function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.rows[0]);
                result(null, res.rows[0].id);
            }
        });           
};

// finds a user by their email and returns all of their information
// Returns user entry
User.getUserByEmail = function (email, result) {
        console.log('getting user by email ', email)
        sql.query("Select * from guilds.users where email = ANY ($1)", [email], function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });   
};
//Sets a user online
//Take a whole user object
//Returns user ID   
User.online = function (user, result) {
    console.log('Setting user online',user)
    sql.query("UPDATE guilds.users SET online= 'T' WHERE id =($1)",[user.id])
    Item.createItem(item, function (err,res){            
            if(err) {
                console.log("error updating user online status: ", err);
                result(err, null);
            }
            else{
                console.log(res.rows[0].id);
                result(null, res.rows[0].id);
            }
        });           
}
//Sets a user offline
//Take a whole user object
//Returns user ID
User.offline = function (user, result) {
    console.log('Setting user offline ',user)
    sql.query("UPDATE guilds.users SET online= 'F' WHERE id =($1)",[user.id])
    Item.createItem(item, function (err,res){            
            if(err) {
                console.log("error updating user online status: ", err);
                result(err, null);
            }
            else{
                console.log(res.rows[0].id);
                result(null, res.rows[0].id);
            }
        });           
}
//Delete a user by setting delete flag
//Take a whole user object
//Returns user ID
User.delete = function(user, result){
    sql.query("UPDATE guilds.users SET deleted= 'T' WHERE id =($1)",[user.id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{               
                 result(null, res.rows[0].id);
                }
            }); 
};

module.exports= {
    User
}