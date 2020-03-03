'use strict';
module.exports = function(app) {
  var controller = require('../controller/appController');

  // User Routes
  app.route('/users')
    .get(controller.list_all_Users)
    .post(controller.create_a_User);
};