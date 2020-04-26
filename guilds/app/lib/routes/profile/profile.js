const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

let pool = require('../../db').pool;

let User = require('../../models/User').User;
let Login = require('../../models/Login').Login;
let Listing = require('../../models/Listing').Listing;
let Item = require('../../models/Item').Item;

// @route /profile
// @desc Route to create guild for user
// @access private
router.put('/', (req, res) => {});

// @route profile/me
// @desc  Get current user profile
// @access private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await User.getUserByid(req.body.id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  //res.send('Profile');
});

module.exports = router;
