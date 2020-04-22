const express = require('express');
const router = express.Router();
const { check, validatorResult } = require('express-validator');

// @route Post api/users
// @desc Register user
// @access Private

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validatorResult(req);
    if ((!error, isEmpty())) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    // res.send('User route');
  }
);

module.exports = router;
