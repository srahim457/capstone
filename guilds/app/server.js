var express = require('express');

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
app.use(
  session({ secret: 'capstone', resave: 'false', saveUninitialized: 'false' })
);
app.use(passport.initialize());
app.use(passport.session());

//parse json/application
app.use(bodyParser.json());
//parse urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// Heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../build'));
}
//var routes = require('./routes/appRoutes.js'); //importing route
//routes(app); //register the route
var path = require('path');

app.use('/public', express.static(__dirname + '/public'));

app.use(flash());
app.set('view engine', 'pug');
app.set('view options', { layout: false });

require('./lib/routes.js')(app);
require('./lib/forgotPassword.js')(app);
require('./lib/resetPassword.js')(app);

app.listen(PORT);
console.log('Node listening on port %s', PORT);
