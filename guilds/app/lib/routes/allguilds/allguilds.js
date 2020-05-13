const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
let pool = require('../../db').pool;

//models
let User = require('../../models/User').User;
let Login = require('../../models/Login').Login;
let Listing = require('../../models/Listing').Listing;
let Guild = require('../../models/Guilds').Guilds;


// @route Post all-guilds
// @desc Route to create guild for user
// @access private
router.post('/create',auth, async (req, res) => {
  try {
    console.log('recieved create',req.body)
    //req.body.guild needed
    // as createguild passes a guild object
    const createdGuild = await Guild.createGuilds([req.body.guild],res)
    ids = {
      userid: req.user.id,
      guildid: createdGuild.id
    }
    const addeduser = await Guild.addUserToGuild([ids],res)
    console.log(createdGuild, 'created guild ')
    res.status(200).json(createdGuild)
  } catch (error) {
    console.log('error with create listing',error)
  }
});

// @route Get all-guilds
// @desc Route to fetch all guilds
// @access private
router.get('/', auth,async (req, res) => {
  try {
    console.log('recieved get all guilds request')
    const allguilds = await Guild.getAllGuilds([req.body],res)
    res.status(200).json(allguilds)
  } catch (error) {
    console.log('error with getting all listings',error)
  }
});

//search for guilds 
//returns all guilds matching that criteria
router.get('/search',auth, async (req, res) => {
  try {
    console.log('recieved search for guild',res)
    const allguilds = await Guild.searchForGuilds(req.body)
    res.status(200).json(allguilds)
  } catch (error) {
    console.log('error with getting all listings',error)
  }
});

module.exports = router;
