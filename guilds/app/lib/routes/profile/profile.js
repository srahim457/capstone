const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

let pool = require('../../db').pool;

let User = require('../../models/User').User;
let Login = require('../../models/Login').Login;
let Listing = require('../../models/Listing').Listing;
let Item = require('../../models/Item').Item;

let userID;
// @route GET profile/me
// @desc  Get logged in user profile
// @access private
router.get('/me', auth, async (req, res) => {
  try {
    const { email, password } = req.body;
    const profile = await User.getUserByEmail([email], res); //finds user using email instead of id
    userID = profile[0].id;
    //console.log(profile[0].id);
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

// @route UPDATE /profile
// @desc Update users profile
// @access Private
router.put(
  '/',
  [auth, [check('email', 'email is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty() == 0) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      firstname,
      lastname,
      username,
      email,
      online,
      phonenum,
      profilepic,
      rating,
      id,
    } = req.body;

    // Build profile object
    const profileFields = {};
    if (firstname) profileFields.firstname = firstname;
    if (lastname) profileFields.lastname = lastname;
    if (username) profileFields.username = username;
    if (email) profileFields.email = email;
    if (online) profileFields.online = online;
    if (phonenum) profileFields.phonenum = phonenum;
    if (profilepic) profileFields.profilepic = profilepic;
    if (rating) profileFields.rating = rating;

    //console.log('Reqbody', email);

    try {
      console.log('USERID', userID);
      let profile = await User.getUserById([49], res);
      //console.log('id:', profile[0]);
      console.log('emaill', email);
      //let profile = await User.getUserByEmail([email], res);

      // //console.log('profile', profile);
      let newProfile;
      if (profile) {
        //UPDATE
        console.log('in here!!');
        newProfile = await User.updateEmail(email, res); //update profile here
        console.log(newProfile);
        //return res.json(profile[0].email);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
