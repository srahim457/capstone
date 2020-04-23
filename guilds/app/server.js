var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');

// connection configurations
//require('dotenv').config();
const PORT = process.env.PORT || 4000;

var flash = require('connect-flash');

var session = require('express-session');
var passport = require('passport');
var request = require('request');

var app = express();

app.use(cors());
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
//var routes = require('./routes/appRoutes.js'); //importing route
//routes(app); //register the route
var path = require('path');

// app.use('/public', express.static(__dirname + '/public'));

app.use(flash());

//require('./lib/routes.js')(app);
require('./lib/forgotPassword.js')(app);
require('./lib/resetPassword.js')(app);

//Init Middleware
app.use(express.json({ extended: false }));

//Defining routes
app.use('/market-place', require('./lib/routes/marketplace/marketplace'));
app.use('/all-guilds', require('./lib/routes/allguilds/allguilds'));
app.use('/profile', require('./lib/routes/profile/profile'));
app.use('/signup', require('./lib/routes/users/users'));
//app.use('/auth', require('./lib/routes/auth/auth'));

// app.get('/', (req, res) => {
//   res.send('API running');
// });

app.listen(PORT);
console.log('Node listening on port %s', PORT);
