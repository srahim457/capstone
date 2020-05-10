const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

let pool = require('../../db').pool;

let User = require('../../models/User').User;
let Login = require('../../models/Login').Login;
let Listing = require('../../models/Listing').Listing;
let Item = require('../../models/Item').Item;

const storage = multer.diskStorage({
  destination: '../public/uploads',
  filename: function (req, file, cb) {
    cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single('myImage');

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

//let upload = multer({ storage: storage }).single('file');

// @route GET profile/me
// @desc  Get logged in user profile
// @access private
router.get('/', auth, async (req, res) => {
  //route profile/me ?
  try {
    const { email, password } = req.body;

    profile = await User.getUserById([req.user.id]); //gets logged in users by tokenid

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
    //if (profile_picture) profileFields.profile_picture = profile_picture;
    if (rating) profileFields.rating = rating;
    if (description) profileFields.description = description;
    if (req.user.id) profileFields.id = req.user.id;
    try {
      let profile = await User.getUserById([req.user.id], res);
      //let description = req.body.description;
      //let phonenum = req.body.phonenum;
      //let id = req.user.id;
      console.log(profileFields, 'fieldss');

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

router.post('/', auth, async (req, res) => {
  await upload(req, res, (err) => {
    console.log('Request ---', req.body);
    console.log('Request file ---', req.file); //Here you get file.
    /*Now do where ever you want to do*/
    if (!err) {
      return res.send(200).end();
    }
  });
});

// router.post('/', function (req, res) {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
//     return res.status(200).send(req.file);
//   });
// });

module.exports = router;
