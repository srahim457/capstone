const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

//@route    GET /auth
//@desc     Test route
//@access   Public

router.get('/', auth, async (req, res) => {
  //res.send('Auth route')
  try {
    // const user = await User.;
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
