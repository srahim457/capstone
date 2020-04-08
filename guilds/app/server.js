const express = require('express');

const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const path = require('path');

port = process.env.PORT || 4000;

// connection configurations
const db = require('./model/db.js');

const app = express();
app.listen(port);
app.use(cors());

//parse json/application
app.use(bodyParser.json());

//parse urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../build'));
}
const routes = require('./routes/appRoutes.js'); //importing route
routes(app); //register the route

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '../build', 'index.html'));
});

console.log('API server started on: ' + port);
