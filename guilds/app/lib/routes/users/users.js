const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
let User = require('../../models/User').User;
let Login = require('../../models/Login').Login;
let Listing = require('../../models/Listing').Listing;
let Item = require('../../models/Item').Item;

const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let sql = require('../../db').pool;

// @route Post api/users
// @desc Register user
// @access Private

router.post(
  '/',
  [
    check('firstname', 'firstname is required').not().isEmpty(),
    check('lastname', 'lastname is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { firstname, lastname, email, password } = req.body;

    try {
      //see if user exists
      //****
      let pwd = await bcrypt.hash(req.body.password, 5);
      const theuser = await User.getUserByEmail([req.body.email], res);
      /// 0 = no row
      if (theuser.length > 0) {
        return res.status(400).send('Email already exists');
      } else {
        ///asigned hashed password
        req.body.pwd = pwd;
        const thelogin = await Login.createLogin([req.body], res);
        const createduser = await User.createUser([req.body], res);

        // const userid = await(User.getUserById([creatinguser[0].id],res))
        // console.log(userid,'user id test')

        //Setting useronline test
        //const online = await(User.online([createduser[0]],res))
        //var userbyemail = await(User.getUserByEmail([req.body.email],res))
        //console.log('check',userbyemail[0].online)

        //Setting useroffline test
        //const offline = await(User.offline([createduser[0]],res))
        //userbyemail = await(User.getUserByEmail([req.body.email],res))
        //console.log('check',userbyemail[0].online)
        user = new User({
          firstname,
          lastname,
          email,
          password,
        });
        //assign new userid to the one that was created
        user.id = createduser[0].id;
        const payload = {
          user: {
            id: user.id, //payload supposed to time in with users id
          },
        };
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            console.log('token \n', token);
            res.status(200).json({
              token,
            }); //console logs the token but it doesnt senf it to the server
          }
        ); //3600 = 1hr;
        //****
      }
    } catch (err) {
      console.error('err: ', err.message);
      res.status(500).send('Server error');
      next();
    } finally {
      console.log('Successfully signed up user/checked for existing');
      next();
    }

    //console.log(req.body);
  }
);

// @route GET api/users
// @desc Register user
// @access Private
router.get('/', (req, res) => {
  res.send('User route');
});

// @route DELETE api/users
// @desc Register user
// @access Private
router.delete('/:id', (req, res) => {
  User.deleteremove(req.id, res);
});

module.exports = router;
