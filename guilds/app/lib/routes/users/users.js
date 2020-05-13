const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
let User = require('../../models/User').User;
let Login = require('../../models/Login').Login;
let Listing = require('../../models/Listing').Listing;
const auth = require('../../middleware/auth');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let sql = require('../../db').pool;

// @route Post /
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
        return res.status(410).send('Email already exists');
      } else {
        ///asigned hashed password
        req.body.pwd = pwd;
        const thelogin = await Login.createLogin([req.body], res);
        console.log('the new login ', thelogin);
        const createduser = await User.createUser([req.body], res);
        /*
        //email update test
        //Login then users in that order
        const oldusercheck = await User.getUserByEmail([thelogin[0].email],res)
        console.log ('usercheck',oldusercheck[0].email)

        emails = {
          old_email: thelogin[0].email,
          new_email: 'NEW EMAIL TESt11@EMAIL.COM'
        }
        await Login.updateEmail([emails],res)
        console.log('updated login email')
        await User.updateEmail([emails],res)
        console.log('updated user email')

        const newusercheck = await User.getUserByEmail([emails.new_email],res)
        console.log ('usercheck',newusercheck[0].email)

        const userid = await(User.getUserById([creatinguser[0].id],res))
        console.log(userid,'user id test')

        //Setting useronline test
        const online = await(User.online([createduser[0]],res))
        var userbyemail = await(User.getUserByEmail([req.body.email],res))
        console.log('check',userbyemail[0].online)

        //Setting useroffline test
        const offline = await(User.offline([createduser[0]],res))
        userbyemail = await(User.getUserByEmail([req.body.email],res))
        console.log('check',userbyemail[0].online)

        //Last entered user test
        const lastuser = await(User.getLastEnteredUser(req,res));
        console.log('last entered user id ', lastuser)

        */
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
// router.get('/', auth, async (req, res) => {
//   res.send('Auth route');
//   try {
//     const user = await User.getUserById([req.user.id], res); // gets firstname lastname email
//     res.status(200).json(user[0]);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Server error');
//   }
// });

// @route DELETE api/users
// @desc Register user
// @access Private
router.delete('/:id', (req, res) => {
  User.deleteremove(req.id, res);
});

module.exports = router;
