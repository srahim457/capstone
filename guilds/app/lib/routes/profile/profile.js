const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

let pool = require('../../db').pool;

let User = require('../../models/User').User;
let Login = require('../../models/Login').Login;
let Listing = require('../../models/Listing').Listing;
let Item = require('../../models/Item').Item;

// @route GET profile/me
// @desc  Get current user profile
// @access private
router.get('/me', auth, async (req, res) => {
  try {
    const { email, password } = req.body;
    const profile = await User.getUserByEmail([email], res); //finds user using email instead of id
    console.log(profile[0]);
    if (profile == 0) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'There is no profile for this user' }] }); //checks to see if the profile is valid
    }
    res.status(200).json(profile[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route /profile
// @desc Update users profile
// @access Private
router.put('/', auth, async (req, res) => {});

module.exports = router;
