const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

let User = require('../../models/User').User;
let Login = require('../../models/Login').Login;
let Listing = require('../../models/Listing').Listing;
let Item = require('../../models/Item').Item;

const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let sql = require('../../db').pool;

// @route Post /users
// @desc Register user
// @access Private

router.post(
  '/',
  [
    check('firstname', 'firstname is required').not().isEmpty(),
    check('lastname', 'lastname is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;

    try {
      let pwd = await bcrypt.hash(req.body.password, 5);
      await JSON.stringify(
        User.getUserByEmail([req.body.email],res, function (err, result) {
          if (result.rows[0]) {
            console.log('email already registered');
            res.status(409).send('Email already exists');
          } else {
            Login.createLogin(req.body.email, pwd, function (err, result) {
              if (err === 0) {
                console.log('Error email exists redirecting now');
                res.status(409).send('Login email already exists');
              } else {
                User.createUser(req.body, function (err, result) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('inserted into users,', result);
                    user = new User({
                      firstname,
                      lastname,
                      email,
                      password,
                      id: result.id,
                    });

                    res.send(
                      sql.query('SELECT MAX(id) FROM guilds.login', User['id'])
                    );
                    const payload = {
                      user: {
                        id: result.id, //payload supposed to time in with users id
                      },
                    };
                    console.log('payload \n', payload);
                    //res.status(200).send('Inserted into users');
                    jwt.sign(
                      payload,
                      config.get('jwtSecret'),
                      { expiresIn: 3600000 },
                      (err, token) => {
                        if (err) throw err;
                        console.log('token \n', token);
                        res.status(200).json({ token }); //console logs the token but it doesnt senf it to the server
                      }
                    ); //3600 = 1hr
                    return;
                  }
                });
              }
            });
          }
        })
      );
      // res.send('User route');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
    //console.log(req.body);
  }
);

// @route GET /users
// @desc Gets a user
// @access Private
router.get('/', async (req, res) => {
  //res.send('User route');
  try {
    console.log(req.user.id);
    const user = await User.getUserById(req.user.id, res); //gets firstname lastname email
    console.log(user, 'after');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route DELETE api/users
// @desc Deletes a  user
// @access Private
router.delete('/:id', (req, res) => {
  User.deleteremove(req.id, res);
});

module.exports = router;
