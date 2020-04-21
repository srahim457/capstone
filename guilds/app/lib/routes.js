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

var User = require('./UserModel').User;
var Login = require('./LoginModel').Login;

pool.connect(function(err) {
    if (err) throw err;
});

module.exports = function (app) {
	
	app.get('/', function (req, res, next) {
		//console.log('base email session' , req.session.email)
		res.render('index', {title: "Home", userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
		
		console.log(req.user);
	});

	
	app.get('/signup', function (req, res, next) {
		res.render('join', {title: "Signup", userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
	});
	
	
	app.post('/signup', async function (req, res) {

		try{
			var pwd = await bcrypt.hash(req.body.password, 5);
			await JSON.stringify(User.getUserByEmail([req.body.email], function(err, result) {
				if(result.rows[0]){
					console.log('email already registered')
					req.flash('warning', "This email address is already registered.");
					res.redirect('/signup');
				}
				else{
					Login.createLogin(req.body.email,pwd, function(err, result) {
						if(err === 0){
							console.log('Error email exists redirecting now');
							res.redirect('/login');
						}
						else {
							User.createUser(req.body,function(err,result){
								if(err){console.log(err);}
								else {
									console.log('inserted into users')	
									req.flash('success','User created.')
									res.redirect('/login');
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
		if(req.isAuthenticated()){
			User.getUserByEmail(res.session.email,function(err,result){
				return result(res)
			})
		}
		else{
			res.redirect('/login');
		}
	});
	
	app.get('/login', function (req, res, next) {
		console.log('checking login get req')
		if (req.isAuthenticated()) {
			res.redirect('/account');
		}
		else{
			res.render('login', {title: "Log in", userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
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
		
		
		const client = await pool.connect()
		try{
			await client.query('BEGIN')
			console.log('local passport use email', username)
			var currentAccountsData = await JSON.stringify(client.query('SELECT email,password FROM guilds.login WHERE email =$1', [username], function(err, result) {
				
				if(err) {
					return done(err)
				}	
				if(result.rows[0] == null){
					req.flash('danger', "Oops. Incorrect login details.");
					return done(null, false);
				}
				else{
					bcrypt.compare(password, result.rows[0].password, function(err, check) {
						if (err){
							console.log('Error while checking password');
							return done();
						}
						else if (check){
							req.session.email = result.rows[0].email
							console.log('session email,' ,req.session.email)
							return done(null, [{email: result.rows[0].email, firstName: result.rows[0].firstName}]);
						}
						else{
							req.flash('danger', "Oops. Incorrect login details.");
							return done(null, false);
						}
					});
				}
			}))
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