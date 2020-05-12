const express = require('express');
const stripe = require('stripe')('sk_test_zlDbmmvqhO05kEFUcfFDRzGX00yMAVDGIv');
const bodyParser = require('body-parser'); // already declared
const exphbs = require('express-handlebars');
let Listing = require('../../models/Listing').Listing;

const app = express();

app.get('/', (req, res) => {
  // res.render('index');
  // console.log("payment received.")
  res.json({ greeting: "hello world" });
});

// Stripe: Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout:'main' }));
app.set('view engine', 'handlebars');

// Stripe: Body Parser Middlware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Stripe: Set Static folder
// app.use(express.static(`${__dirname}/public`)); // for storing images

// Stripe: Index Route
// connected to app/views/layouts/main.handlebars
// connected to app/views/index.handlebars
// app.get('/', (req, res) => {
//   res.render('index');
// });

// Testing to see what it looks like
app.get('/success', (req, res) => {
  res.render('success');
});

// Stripe: Charge Route (Posting payment)
app.post('/', (req,res) => {
  const amount = 2500;
  // console.log(req.body); // get json information to be sent out
  // res.send('TEST');  // display on localhost:4000/charge
  // this gets sent out
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount: amount,
    description: "Web Development ebook",
    currency: 'usd',
    customer: customer.id
  }))
  .then(charge => res.render('success'))
});

module.exports = app;