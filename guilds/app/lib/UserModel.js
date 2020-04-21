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

//Updates a user's phone number
//Returns user id
User.updateUserPhone = function (User, result) {
    console.log('updating user phone',User)
    sql.query("UPDATE guilds.users SET phonenum=($1) WHERE email = ANY($2)"[User.phonenum,User.email], function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.rows[0].id);
                result(null, res.rows[0].id);
            }
        });           
};
//Updates both the user and their login email
//Returns user id
User.updateUserEmail = function (User, result) {
    console.log('updating user email',User['email']),
    sql.query("UPDATE guilds.users SET email=($1) WHERE email = ANY($1)",[User['email']], function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.rows[0].id);
                sql.query("UPDATE guilds.login SET email=($1) WHERE email = ANY($1)",[User.email], function (err, res) {
            
                    if(err) {
                        console.log("error: ", err);
                        result(err, null);
                    }
                    else{
                        console.log(res.rows[0].id);
                        result(null, res.rows[0].id);
                    }
                });
                result(null, res.rows[0].id);
            }
        });           
};
//checks for duplicate emails before creating a user
//Returns the whole user entry
User.createUser = function (newUser, result) {
    console.log('inserting new user now',newUser),
    sql.query("INSERT INTO guilds.users(first_name,last_name,email) values($1,$2,$3) RETURNING *",[newUser.firstname,newUser.lastname,newUser.email], function (err, res) {
            
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
// TODO: Convert to prepared statements
User.getAllUsers = function (result) {
        sql.query("Select * from guilds.users", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('Users : ', res.rows);  

                 result(null, res.rows);
                }
            });   
};
// TODO: Convert to prepared statements and change to new "Delete"
User.deleteremove = function(id, result){
     sql.query("DELETE FROM users WHERE USER_ID = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= {
    User
}