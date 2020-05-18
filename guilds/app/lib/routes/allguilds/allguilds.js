const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
let pool = require('../../db').pool;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: '../public/guilds', //orig ../public/uploads
  filename: function (req, file, cb) {
    cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single('myImage');

let guildId;

//models
let User = require('../../models/User').User;
let Login = require('../../models/Login').Login;
let Listing = require('../../models/Listing').Listing;
let Guild = require('../../models/Guilds').Guilds;


// @route Post all-guilds
// @desc Route to create guild for user
// @access private
router.post('/create', auth, async (req, res) => {
  try {
    console.log('recieved create', req.body)
    //req.body.guild needed
    // as createguild passes a guild object

    newguild = {
      guild: req.body.guild,
      userid: req.user.id
    }
    const createdGuild = await Guild.createGuilds([newguild], res)

    guildId = createdGuild.id;

    ids = {
      userid: req.user.id,
      guildid: createdGuild.id
    }
    console.log(guildId, 'this is the guild id');
    const addeduser = await Guild.addUserToGuild([ids], res)
    console.log(createdGuild, 'created guild ')
    res.status(200).json(createdGuild)
  } catch (error) {
    console.log('error with create guild', error)
  }
});

// @route post guild picture
// @desc post users guild picture
// @access Private
router.post('/picture', auth, async (req, res) => {
  await upload(req, res, (err) => {
    //console.log('Request ---', req.body);
    //console.log('Request file ---', req.file); //Here you get file.
    /*Now do where ever you want to do*/

    let path = req.file.path;
    console.log(guildId, 'PAssed item guildid jdnjsnjfgnsl'); //change this for allguilds query
    const imageObj = {
      id: guildId, //item id here instead
      image_picture: path,
    };

    Guild.createItemImage([imageObj], res);
    if (!err) {
      return res.sendStatus(200).end();
    }
  });
});

// @route Get all-guilds
// @desc Route to fetch all guilds
// @access private
router.get('/', auth, async (req, res) => {
  try {
    console.log('recieved get all guilds request')
    const allguilds = await Guild.getAllGuilds([req.body], res)
    const freelistings = await Listing.freeListings(req,res)
    res.status(200).json(allguilds)
  } catch (error) {
    console.log('error with getting all guilds', error)
  }
});

//Adds a user to a guild
router.put('/addtoguild/:id', auth, async (req, res) => {
  try {
    console.log('recieved add to guilds request',req.params.id)
    addRequest={userid: req.user.id, guildid: req.params.id}
    const added = await Guild.addUserToGuild([addRequest], res)
    res.status(200).json(added)
  } catch (error) {
    console.log('error with added a user to the guild', error)
  }
});

//search for guilds 
//returns all guilds matching that criteria
router.get('/search/:query', auth, async (req, res) => {
  try {
    console.log('recieved search for guild', req.params.query)
    const allguilds = await Guild.searchForGuilds(req.params.query)
    res.status(200).json(allguilds)
  } catch (error) {
    console.log('error with searching for a guild', error)
  }
});

module.exports = router;
