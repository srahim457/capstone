const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User').User;
let Login = require('../models/Login').Login;
const { check, validationResult } = require('express-validator');

let sql = require('../db').pool;

//@route    GET /auth
//@desc     gets auth user
//@access   Private

router.get('/', auth, async (req, res) => {
  //res.send('Auth route');
  try {
    const user = await User.getUserById([req.user.id]); //gets user by id from token
    res.status(200).json(user[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//THIS IS FOR LOGIN
// @route Post /auth
// @desc Authenticate user & get token
// @access Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await Login.getUserByEmail([email], res); //changed from user to login
      console.log('LOOGGIN', user[0]);
      if (user == 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] }); //checks if user email is valid
      }
      console.log(user[0].password, 'user hash psw');
      //res.status(200).json(user[0]);
      //console.log(user[0].password, 'this is password');
      console.log(req.body.password, 'input password');
      const isMatch = await bcrypt.compare(req.body.password, user[0].password);

      if (isMatch == 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] }); //checks to see password is valid
      }

      user = await User.getUserByEmail([email], res);
      console.log('2nd User', user);

      const payload = {
        user: {
          id: user[0].id, //payload supposed to time in with users id
        },
      };
      console.log(payload, 'payload');
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          console.log('token \n', token);
          req.app.locals.user = user;
          res.status(200).json({ token }); //console logs the token but it doesnt senf it to the server
        }
        
      ); //3600 = 1hr;
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
