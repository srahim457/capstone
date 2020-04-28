'use strict';
var sql = require('./db.js').pool;

var Login = function(login){
    this.email = login.email;
    this.password = login.password; 
    this.reset_pw_tkn = login.reset_pw_tkn;
    this.reset_pw_expires = login.reset_pw_expires;
};
//Login

//Create a new login entry
//Returns the whole login entry
Login.createLogin = function (email,pass,result) {    
    //Checking for duplicate emails
    sql.query("SELECT * from guilds.login where email = $1",[email],function (err,res){
        console.log('Checking if email ', email ,' exists');
        if(res.rows.length > 0){
            console.log('Email already exists')
            result(0,null)
        }
        else{
            console.log('Email is new')
            console.log(pass,email)
            sql.query("INSERT INTO guilds.login (EMAIL,PASSWORD) VALUES ($1,$2) ",[email, pass], function (err, res) {
            
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.rows[0]);
                    result(null, res.rows[0]);
                }
            });  
        }
    });
         
};
// Set both reset tokens for a login
// Returns login id
Login.forgotPassword = function(reset_info){
    var curr_date = new Date()
    curr_date.setTime(reset_info.resetPasswordExpires)
    sql.query("UPDATE guilds.login SET reset_pw_tkn =($1), reset_pw_expires =($2) WHERE email =($3) RETURNING *",[reset_info.resetPasswordToken,curr_date.toDateString(),reset_info.email],function (err,res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log('completed forgot password')
            console.log(res.rows[0].id);
        }
    });
};
//Return login entry
Login.findByToken = function(login_info,result){
    var curr_date = new Date()
    curr_date.setTime(login_info.resetPasswordExpires)
    sql.query("Select * from guilds.login where resetPasswordToken = ANY ($1) and resetPasswordExpires > ($2)",[login_info.resetPasswordToken,curr_date.toDateString()],function (err,res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log('completed token find')
            console.log(res.rows[0]);
            result(null,res)
        }
    });
};
//Return login entry
Login.findByEmail = function(login_info,result){
    sql.query("Select * from guilds.login where email = ANY ($1)",[login_info],function (err,res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log('completed login find')
            result(null,res)
        }
    });
};


module.exports= {
    Login
}