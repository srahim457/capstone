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
  let uservar;

  function callback(placeholder) {
    uservar = placeholder;
  }
  try {
    console.log(req.user.id);
    const user = await User.getUserById(req.user.id, res, callback(res)); //gets firstname lastname email
    console.log(uservar, 'after');
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

    console.log(typeof email);
    try {
      const user = await sql.query(
        'Select * from guilds.users where id =($1)',
        [email]
      );

      //console.log(typeof user);
      res.json(user.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
