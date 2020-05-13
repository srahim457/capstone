var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');

// connection configurations
//require('dotenv').config();
const PORT = process.env.PORT || 4000;

var flash = require('connect-flash');

var session = require('express-session');
//var passport = require('passport');
var request = require('request');

var app = express();

app.use(cors());
let User = require('./lib/routes/users/users').User;
// app.use(
//   session({ secret: 'capstone', resave: 'false', saveUninitialized: 'false' })
// );
// app.use(passport.initialize());
// app.use(passport.session());

//parse json/application
// app.use(bodyParser.json());
//parse urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../build'));
}

var path = require('path');

app.use(flash());

require('./lib/forgotPassword.js')(app);
require('./lib/resetPassword.js')(app);

//Init Middleware
app.use(express.json({ extended: false }));

//Defining routes
app.use('/market-place', require('./lib/routes/marketplace/marketplace'));
app.use('/all-guilds', require('./lib/routes/allguilds/allguilds'));
app.use('/profile', require('./lib/routes/profile/profile'));
app.use('/signup', require('./lib/routes/users/users')); //signup
app.use('/auth', require('./lib/routes/auth')); //orig auth but to login

// app.get('/auth', async (req, res) => {
//   //res.send('API running');
//   try {
//     console.log(req.user.id);
//     const user = await User.getUserById(req.user.id); //gets firstname lastname email
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

app.listen(PORT);
console.log('Node listening on port %s', PORT);
