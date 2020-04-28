const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

let sql = require('../db').pool;

//@route    GET /auth
//@desc     gets auth user
//@access   Public

router.get('/', auth, async (req, res) => {
  //res.send('Auth route');
  try {
    console.log(req.user.id);
    const user = await User.getUserById(req.user.id); //gets firstname lastname email
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.getAll;

module.exports = router;
