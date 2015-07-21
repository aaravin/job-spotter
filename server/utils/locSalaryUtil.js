var Location = require('../../db/models/location');
var db = require('../../db/config.js');

module.exports = {
  updateLocSalaries: function() {
    db.knex.raw('UPDATE locations SET avgSalary = \
      (SELECT AVG(salary_avg) FROM links WHERE links.location_id = locations.id)').then(function() {
        console.log("DONE UPDATING");
      });
  }
};
