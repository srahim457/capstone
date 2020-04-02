'use strict';
module.exports = function(app) {
  var controller = require('../controller/appController');

  // Home routes
  app.get('/', (request, response) => {
	response.sendFile(path.join('../build/index.html'));
});

  // User Routes
  app.route('/users')
    .get(controller.list_all_Users)
    .post(controller.create_a_User);
  app.route('/update')
    .post(controller.update_a_User);    
};