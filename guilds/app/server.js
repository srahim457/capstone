const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
port = process.env.PORT || 4000;

// connection configurations
var db = require('../app/model/db') 


app.listen(port);

console.log('API server started on: ' + port);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('../app/routes/appRoutes'); //importing route
routes(app); //register the route