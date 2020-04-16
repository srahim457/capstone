var util = require('util');
var express = require('express');
var app = express();
var passport = require("passport");

var fs = require('fs');
var request = require('request');
var pool = require('./db').pool;
const bcrypt= require('bcrypt')

//TODO
//Add forgot password functionality
//Add email confirmation functionality
//Add edit account page


app.use(express.static('public'));

const LocalStrategy = require('passport-local').Strategy;
//const connectionString = process.env.DATABASE_URL;

var currentAccountsData = [];

var User = require('./appModel').User;
var Login = require('./appModel').Login;

pool.connect(function(err) {
    if (err) throw err;
});

module.exports = function (app) {
	app.post('/signup', async function (req, res) {
		
		try{
			var pwd = await bcrypt.hash(req.body.password, 5);
			await JSON.stringify(User.getUserByEmail([req.body.email], function(err, result) {
				if(result.rows[0]){
					console.log('email already registered')
					res.status(409).send('Email already exists');
				}
				else{
					Login.createLogin(req.body.email,pwd, function(err, result) {
						if(err === 0){
							console.log('Error email exists redirecting now');
							res.status(409).send('Login email already exists');
						}
						else {
							User.createUser(req.body,function(err,result){
								if(err){console.log(err);}
								else {
									console.log('inserted into users')	
									res.status(200).send('Inserted into users');
									return;
										}
									});		
								}
							})		
				}
				
			}));
		} 
		catch(e){throw(e)}
	});
	
	app.get('/profile', function (req, res, next) {
		console.log('checking profile get req',req.isAuthenticated())
		if(req.isAuthenticated()){
			res.status(200).send(JSON.stringify(User.getUserByEmail([req.session.email])))
		}
		else{
			res.status(403).send('Error: PLease login')
		}
	});
	
	app.get('/login', function (req, res, next) {
		console.log('checking login get req',req.isAuthenticated())
		if (req.isAuthenticated()) {
			res.redirect('/profile');
		}
		else{
			res.redirect('/');
		}
		
	});
	
	app.get('/logout', function(req, res){
		
		console.log(req.isAuthenticated());
		req.logout();
		console.log(req.isAuthenticated());
		req.flash('success', "Logged out. See you soon!");
		res.redirect('/');
	});
	
	app.post('/login',	passport.authenticate('local', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
		}), function(req, res) {
			console.log('post login auth')
		if (req.body.remember) {
			req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
			} else {
			req.session.cookie.expires = false; // Cookie expires at end of session
		}
		res.redirect('/');
	});
	
	
	
}

passport.use('local', new  LocalStrategy({passReqToCallback : true}, (req, username, password, done) => {
	loginAttempt();
	async function loginAttempt() {
		console.log('Login attempt')
		try{
			console.log('local passport use email', username)
			Login.findByEmail([username], function(err, result) {	
				if(err) {
					return done(err)
				}	
				if(result.rows[0] == null){
					console.log('Error: PLease login');
					return done(null, false);
				}
				else{
					bcrypt.compare(password, result.rows[0].password, function(err, check) {
						if (err){
							console.log('Error while checking password');
							return done();
						}
						else if (check){
							console.log(req.session.passport)
							req.session.email = result.rows[0].email
							console.log(req.session)
							req.session.user = result.rows[0].id
							console.log(result.rows[0],'session email,' ,req.session.email)
							return done(null, [{email: result.rows[0].email, user: result.rows[0].id}]);
						}
						else{
							req.flash('danger', "Oops. Incorrect login details.");
							return done(null, false);
						}
					});
				}
			})
		}
		
		catch(e){throw (e);}
	};
	
}
))




passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});		