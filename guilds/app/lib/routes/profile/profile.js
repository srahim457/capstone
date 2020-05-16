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
let Guild = require('../../models/Guilds').Guilds;

const storage = multer.diskStorage({
  destination: '../public/uploads', //orig ../public/uploads
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
router.get('/:id', auth, async (req, res) => {
  //route profile/me ?
  try {
    idtouse = 0
    console.log('getting user profile with id \n',req.params)
    const { email, password } = req.body;
    if(req.params.id == -1){
      idtouse = req.user.id
    }
    else{
      idtouse = req.params.id
    }
    profile = await User.getUserById([idtouse]); //gets logged in users by tokenid

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
//generic get request for the user
router.get('/', auth, async (req, res) => {
  //route profile/me ?
  try{
    clearedlisting = await Listing.freeListings(req,res)
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
//gets the users guild
router.get('/guilds/:id', auth, async (req, res) => {
  //route profile/me ?
  try {
    idtouse = 0
    console.log('at get user guilds \n',req.params)
    if(req.params.id == -1){
      idtouse = req.user.id
    }
    else{
      idtouse = req.params.id
    }
    clearedlisting = await Listing.freeListings(req,res)
    userguilds = await Guild.getAllUserGuilds([idtouse]); //gets logged in users by tokenid

    //console.log('all user guilds', userguilds);
    res.status(200).json(userguilds);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//Find and view someone elses profile
router.get('/viewprofile/:query', auth, async (req, res) => {
  //route profile/me ?
  try {
    console.log('at get another users profile \n',req.params.query)
    user = await User.getUserById([req.params.query]); //gets logged in users by tokenid

    console.log('the user profiles', user);
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/search/:query', auth, async (req, res) => {
  //route profile/me ?
  try {
    console.log('at search for a user \n',req.params.query)
    users = await User.searchForUser([req.params.query]); //gets logged in users by tokenid

    console.log('Total users found', users.length);
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
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

// @route UPDATE /profile
// @desc Update users profile picture
// @access Private
router.post('/', auth, async (req, res) => {
  await upload(req, res, (err) => {
    //console.log('Request ---', req.body);
    //console.log('Request file ---', req.file); //Here you get file.
    /*Now do where ever you want to do*/

    let path = req.file.path;

    const pictureObj = {
      id: req.user.id,
      profile_picture: path,
    };

    User.updateProfilePicture([pictureObj], res);
    if (!err) {
      return res.sendStatus(200).end();
    }
  });
});

//saves the user's message
router.post('/message/create', auth, async (req, res) => {
  console.log(' just got a create message request', req.body)
});

//updates the user chain of messages
router.put('/message/update', auth, async (req, res) => {

});

//Gets a profile matching the passed username
router.get('/search/:query', auth,async (req, res, next) => {
  console.log(req.params.query);
    try {
      console.log('seaching for a user with ',req.params.query)
      const users = await User.searchForUser([req.params.query],res);
      console.log('users with that name', users.rows.length);
      res.status(200).json(users);
    } catch (error) {
      console.error('error searching for a user \n', error);
    }
    console.log('called search for user', req.params);
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
