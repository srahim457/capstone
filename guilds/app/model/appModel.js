'use strict';
var sql = require('./db.js');
var bcrypt = require('bcryptjs')

//User object constructor
var User = function(user){
    this.FIRST_NAME = user.firstname;
    this.LAST_NAME = user.lastname;
};

var Login = function(login){
    this.EMAIL = login.email;
    this.PASSWORD = login.password;
    this.ID = 0;
};
User.getLastUser  = function (result) {
    sql.query("SELECT LAST_INSERT_ID()", function (err, res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("GOT THE LAST INSERT ID",res[0]);
            result(null, res);
        }
    });   
};    
User.createUser = function (newUser, result) {
        sql.query("INSERT INTO users set ?", newUser, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};
Login.createLogin = function (newLogin, userid, result) {    
    sql.query("INSERT INTO login (USER_ID,EMAIL,PASSWORD) VALUES (?, ?, ?) ",[userid, newLogin.EMAIL, newLogin.PASSWORD], function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });           
};
User.getUserById = function (UserId, result) {
        sql.query("Select User from users where USER_ID = ? ", UserId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
User.getAllUsers = function (result) {
        sql.query("Select * from users", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('Users : ', res);  

                 result(null, res);
                }
            });   
};
User.updateById = function(id, User, result){
  sql.query("UPDATE users SET user = ? WHERE USER_ID = ?", [User.User, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
User.remove = function(id, result){
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
    User,
    Login
}