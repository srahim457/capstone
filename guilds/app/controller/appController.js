'use strict';
var User = require('../model/appModel').User;
var Login = require('../model/appModel').Login;

exports.list_all_Users = function(req, res) {
  User.getAllUsers(function(err, User) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', User);
    res.send(User);
  });
};

exports.create_a_User = function(req, res) {
  console.log('body create user', req.body)
  var new_User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }
  var new_Login = {
    email: req.body.email,
    password: req.body.password
  }
  //handles null error 
   if(!new_User.firstname || !new_User.lastname){
    res.status(400).send({ error:true, message: 'Error Signup not completed fully' + new_User.firstname + new_Login.email});
  }
    else{  
      console.log("Saving user login ");
      Login.createLogin(new_Login,function(err, new_Login) {
        if (err === 0)
          res.status(400).send('Email already exists')
        else {
          User.createUser(new_User, function(err, new_User){
            if (err)
              res.send(err);
            else{
              res.send('Successfully created user');
            }
          });
        }
      });
    };
};

exports.read_a_User = function(req, res) {
  User.getUserByEmail(req.params.User, function(err, User) {
    if (err)
      res.send(err);
    res.json(User);
  });
};


exports.update_a_User = function(req, res) {
  console.log("Updating the users information",req.body)
  User.updateUserEmail(req.body, new User(req.body), function(err, User) {
    if (err)
      res.send(err);
    User.updateUserPhone(req.body.User, new User(req.body), function(err, User) {
      if (err)
        res.send(err);  
    res.json(User);
    });
  });
}


exports.delete_a_User = function(req, res) {

  User.remove( req.params.UserId, function(err, User) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};