var User = require('./appModel').User;
var Login = require('./appModel').Login;

/**
 * @swagger
 * /reset:
 *   get:
 *     tags:
 *       - Users
 *     name: Reset Password Link
 *     summary: Create validation string in reset password link to verify user's allowed to reset their password
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: resetPasswordToken
 *         in: query
 *         schema:
 *           type: string
 *         required:
 *           - resetPasswordToken
 *     responses:
 *       '200':
 *         description: User's password reset link is valid
 *       '403':
 *         description: Password reset link is invalid or has expired
 */

module.exports = (app) => {
  app.get('/resetPassword', (req, res) => {
    Login.findByToken({
      where: {
        resetPasswordToken: req.query.resetPasswordToken,
        resetPasswordExpires: Date.now(),
      },  function (err, result) {
      if (result.rows[0] === undefined) {
        console.error('password reset link is invalid or has expired');
        res.status(403).send('password reset link is invalid or has expired');
      } else {
        res.status(200).send({
          username: user.username,
          message: 'password reset link a-ok',
          });
        };
      }
    })
  });
};
