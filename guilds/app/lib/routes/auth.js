const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User').User;
const { check, validationResult } = require('express-validator');

let sql = require('../db').pool;

//@route    GET /auth
//@desc     gets auth user
//@access   Public

router.get('/', auth, async (req, res) => {
  //res.send('Auth route');
  try {
    console.log(req.user.id);
    const user = await User.getUserById(req.user.id, res); //gets firstname lastname email
    console.log(user, 'after');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

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
      //await JSON.stringify(
      const test = await JSON.stringify(
        User.getUserByEmail([email], function (err, result) {
          // if (result.rows[0]) {
          //   console.log('email already registered');
          //   res.status(409).send('Email already exists');
          // } else {
          // }
          //console.log(result);
          //return result;
          result = res.json(result.rows[0].id);
          //return result;
        })
      );
      //);
      console.log(test);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }

    //console.log(req.body);
  }
);

module.exports = router;
