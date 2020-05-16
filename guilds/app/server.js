var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
const morgan = require("morgan"); // Loggin

const http = require('http');
var io = require('socket.io');

// connection configurations
//require('dotenv').config();
const PORT = process.env.PORT || 4000;

var flash = require('connect-flash');

var session = require('express-session');
//var passport = require('passport');
var request = require('request');

var app = express();

const server = http.createServer(app);

// ---------------------------STRIPE---------------------------
// with handlebars

// // const express = require('express'); // already declared
// const stripe = require('stripe')('sk_test_zlDbmmvqhO05kEFUcfFDRzGX00yMAVDGIv');
// // const bodyParser = require('body-parser'); // already declared
// const exphbs = require('express-handlebars');

// var app = express();

// // Stripe: Handlebars Middleware
// app.engine('handlebars', exphbs({ defaultLayout:'main' }));
// app.set('view engine', 'handlebars');

// // Stripe: Body Parser Middlware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // Stripe: Set Static folder
// app.use(express.static(`${__dirname}/public`)); // for storing images

// // Stripe: Index Route
// // connected to app/views/layouts/main.handlebars
// // connected to app/views/index.handlebars
// app.get('/', (req, res) => {
//   res.render('index');
// });

// // Testing to see what it looks like
// app.get('/success', (req, res) => {
//   res.render('success');
// });

// // Stripe: Charge Route (Posting payment)
// app.post('/charge', (req,res) => {
//   const amount = 2500;
//   // console.log(req.body); // get json information to be sent out
//   // res.send('TEST');  // display on localhost:4000/charge
//   // this gets sent out
//   stripe.customers.create({
//     email: req.body.stripeEmail,
//     source: req.body.stripeToken
//   })
//   .then(customer => stripe.charges.create({
//     amount: amount,
//     description: "Web Development ebook",
//     currency: 'usd',
//     customer: customer.id
//   }))
//   .then(charge => res.render('success'))
// });

// ----------------------STRIPE end---------------------------
app.use(morgan('combined'));
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

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));



const socketIo = io(server);

// Start listening
server.listen(process.env.PORT || 4001);
console.log(`Listening on port ${'4001'}`);

// Setup socket.io
var connectedUsers = {}
socketIo.on('connection', socket => {
  
  const username = socket.handshake.query.username;
  console.log(`${username} connected`);
  connectedUsers[username] = socket;
  console.log(Object.keys(connectedUsers),' users after connected')

  socket.on('client:message', data => {
    console.log(`${data.username}: ${data.message},${data.targetname}`);
    console.log('sending a message now')
    connectedUsers[username].targetname = data.targetname
    console.log(Object.keys(connectedUsers),'user info')
    if(connectedUsers.hasOwnProperty(data.targetname)){
      console.log('the other user is connected \n')
      connectedUsers[data.targetname].emit('server:message', data);
    }
    else{
      console.log('the user is not connected')
      connectedUsers[data.username].emit('not connected', finalresponse={username: data.targetname, message:'user not connected', sentby: data.username});
    }    
    //socket.broadcast.emit('server:message', data);
    //console.log(Object.keys(connectedUsers), connectedUsers.hasOwnProperty(data.targetname))
  });

  socket.on('disconnect', () => {
    console.log(`${username} disconnected`);
    delete connectedUsers[username]
    console.log(connectedUsers,' users after disconnected')
    
  });
});

//Defining routes
app.use('/market-place', require('./lib/routes/marketplace/marketplace'));
app.use('/all-guilds', require('./lib/routes/allguilds/allguilds'));
app.use('/profile', require('./lib/routes/profile/profile'));
app.use('/signup', require('./lib/routes/users/users')); //signup
app.use('/auth', require('./lib/routes/auth')); //orig auth but to login
app.use('/forgotpassword', require('./lib/forgotPassword'));
app.use('/reset', require('./lib/resetPassword'));
//app.use('/updatePasswordViaEmail', require('./lib/updatePasswordViaEmail'));
app.use('/payment', require('./lib/routes/marketplace/payment')); // payment

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
