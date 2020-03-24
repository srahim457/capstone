var express = require('express');

var bodyParser = require('body-parser');
var session = require('express-session')
var cors = require('cors');
var path = require('path')

port = process.env.PORT || 4000;

// connection configurations
var db = require('./model/db.js') 

var app = express();
app.listen(port);
app.use(cors());
//parse json/application
app.use(bodyParser.json());
//parse urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// Heroku
app.use(express.static(path.join(__dirname, 'guilds/build')));
var routes = require('./routes/appRoutes.js'); //importing route
routes(app); //register the route

console.log('API server started on: ' + port);