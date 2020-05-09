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
// @desc  Get logged in user profile
// @access private
router.get('/', auth, async (req, res) => {
  //route profile/me ?
  try {
    const { email, password } = req.body;
    //console.log(email, 'EMAL');
    //const profile = await User.getUserByEmail([email], res); //finds user using email instead of id
    profile = await User.getUserById([req.user.id]); //gets logged in users by tokenid

    //const userID = req.user.id;

    console.log('Print profile', profile[0]);
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
  [auth /*, [check('email', 'email is required').not().isEmpty()]*/],
  async (req, res) => {
    //const errors = validationResult(req);
    // if (errors.isEmpty() == 0) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const {
      first_name,
      last_name,
      username,
      phonenum,
      description,
      email,
      online,
      profile_picture,
      rating,
      id,
    } = req.body;

    // Build profile object
    const profileFields = {};
    if (first_name) profileFields.first_name = first_name;
    if (last_name) profileFields.last_name = last_name;
    if (username) profileFields.username = username;
    if (email) profileFields.email = email;
    if (online) profileFields.online = online;
    if (phonenum) profileFields.phonenum = phonenum;
    if (profile_picture) profileFields.profile_picture = profile_picture;
    if (rating) profileFields.rating = rating;
    if (description) profileFields.description = description;
    if (req.user.id) profileFields.id = req.user.id;
    try {
      let profile = await User.getUserById([req.user.id], res);
      //let description = req.body.description;
      //let phonenum = req.body.phonenum;
      //let id = req.user.id;
      console.log(profileFields, 'fieldss');
      //console.log('new email', email);
      //let profile = await User.getUserByEmail([email], res);

      //console.log('old email', profile[0].email);
      //let newEmail = email;
      //let newProfile;
      // emailObj = {
      //   email: profile[0].email,
      //   newEmail: newEmail,
      // };

      if (profile) {
        //UPDATE
        //await User.updateEmail([emailObj], res); //updates email here
        //console.log(newProfile);
        await User.updateUserInformation([profileFields], res);
        return res.json(profileFields);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
