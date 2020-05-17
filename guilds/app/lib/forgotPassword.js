const crypto = require('crypto');
const express = require('express');
const router = express.Router();
require('dotenv').config();
var User = require('./models/User').User;
var Login = require('./models/Login').Login;
const auth = require('./middleware/auth');
const nodemailer = require('nodemailer');
let app = express();

//https://github.com/paigen11/mysql-registration-passport/tree/feature-example-branch/client
// async function parseEmail(orig) {
//   let res = await orig.split(/['']/);
//   let res2 = JSON.stringify(res[1]);
//   console.log(res2, 'res2');
//   return res2;
// };

function objtostr(obj) {
  let res = Object.keys(obj);
  let res2 = JSON.stringify(res);
  let res3 = res2.substr(2, res2.length - 4);
  return res3;
}

// module.exports = (app) => {
//   app.post('/forgotpassword', async (req, res) => {
//     console.log(req.body, "           bhj");

//     // console.log(typeof parser, 'typeoff');
//     // console.log('Parser', parser);
//     let myEmail = await objtostr(req.body);
//     console.log(myEmail, 'myEmail');
//     if (myEmail === "") {
//       res.status(400).send('email required');
//     } else {
//       //console.error(req.body.email);
//       await User.getUserByEmail([myEmail], function (err, result) {  //in here
//         console.log(result, 'resulte');

//         if (result.rows[0] === null) {
//           console.error('email not in database');
//            res.status(403).send('email not in db');
//         } else {
//           console.log('we are in here');
//           const token = crypto.randomBytes(20).toString('hex');
//           Login.forgotPassword({
//             resetPasswordToken: token,
//             resetPasswordExpires: Date.now() + 3600000,
//             email: myEmail,
//           });

//           const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//               user: `${process.env.EMAIL_ADDRESS}`,
//               pass: `${process.env.EMAIL_PASSWORD}`,
//             },
//           });

//           const mailOptions = {
//             from: 'GuildsPsw@gmail.com',
//             to: `${myEmail}`,
//             subject: 'Link To Reset Password',
//             text:
//               'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//               'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
//               `http://localhost:3000/reset/${token}\n\n` +
//               'If you did not request this, please ignore this email and your password will remain unchanged.\n',
//           };

//           console.log('sending mail');

//           transporter.sendMail(mailOptions, (err, response) => {
//             if (err) {
//               console.error('there was an error: ', err);
//             } else {
//               console.log('here is the res: ', response);
//               res.status(200).json('recovery email sent');
//               response.redirect('/resetPassword/?' + token);
//             }
//           });
//         }
//       });
//     }
//   });
// };

module.exports = (app) => {
  app.post('/forgotpassword', async (req, res) => {

    let myEmail = await objtostr(req.body);
    console.log(myEmail, 'myEmail');
    if (myEmail === "") {
      res.status(400).send('email required');
    } else {
      //console.error(req.body.email);
      const token = crypto.randomBytes(20).toString('hex');
      // user.update({                                             //update Db with token value here
      //   resetPasswordToken: token,
      //   resetPasswordExpires: Date.now() + 3600000,  
      // });

      Login.forgotPassword({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
        email: myEmail,
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });

      const mailOptions = {
        from: 'GuildsPsw@gmail.com',
        to: `${myEmail}`,
        subject: 'Link To Reset Password',
        text:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
          `http://localhost:3000/reset/${token}\n\n` +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      };

      console.log('sending mail');

      await transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
          res.status(200).json('recovery email sent');
          response.redirect('/resetPassword/?' + token);
        }
      });
    }
  })
}