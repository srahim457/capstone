'use strict';

var AllMethods = require('../model/appModel.js');
var User = AllMethods.User;
var Login = AllMethods.Login;

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
  var new_User = new User(req.body);
  var new_Login = new Login(req.body);

  //handles null error 
   if(!new_User.FIRST_NAME || !new_User.LAST_NAME){

    res.status(400).send({ error:true, message: 'Error Signup not completed fully' + new_User.FIRST_NAME + new_Login.EMAIL});
  }
    else{
  
  User.createUser(new_User, function(err, User) {
    
        if (err)
            res.send(err);
        res.json(User);
        console.log("THIS IS THE USER" + User + new_Login.EMAIL);
        Login.createLogin(new_Login, User, function(err, Login) {});
        }
    );
};
};


exports.read_a_User = function(req, res) {
  User.getUserById(req.params.UserId, function(err, User) {
    if (err)
      res.send(err);
    res.json(User);
  });
};


exports.update_a_User = function(req, res) {
  User.updateById(req.params.UserId, new User(req.body), function(err, User) {
    if (err)
      res.send(err);
    res.json(User);
  });
};


exports.delete_a_User = function(req, res) {

  User.remove( req.params.UserId, function(err, User) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};