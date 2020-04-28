const crypto = require('crypto');

require('dotenv').config();
var User = require('./UserModel').User;
var Login = require('./LoginModel').Login;
const nodemailer = require('nodemailer');

module.exports = (app) => {
  app.post('/forgotPassword', (req, res) => {
    if (req.body.email.length === 0) {
      res.status(400).send('email required');
    } else {
      console.error(req.body.email);
      User.getUserByEmail([req.body.email], function (err, result) {
        if (result.rows[0] === undefined) {
          console.error('email not in database');
          res.status(403).send('email not in db');
        } else {
          const token = crypto.randomBytes(20).toString('hex');
          Login.forgotPassword({
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 3600000,
            email: req.body.email,
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
            to: `${req.body.email}`,
            subject: 'Link To Reset Password',
            text:
              'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
              `http://localhost:3000/reset/${token}\n\n` +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n',
          };

          console.log('sending mail');

          transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
              console.error('there was an error: ', err);
            } else {
              console.log('here is the res: ', response);
              res.status(200).json('recovery email sent');
              response.redirect('/resetPassword/?' + token);
            }
          });
        }
      });
    }
  });
};
