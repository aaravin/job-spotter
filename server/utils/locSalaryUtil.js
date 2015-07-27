var db = require('../../db/config.js');
var Location = require('../../db/models/location');

module.exports = {
  updateLocSalaries: function() {
    db.knex.raw('UPDATE locations SET avgSalary = \
      (SELECT AVG(salary_avg) FROM links WHERE links.location_id = locations.id AND salary_avg > 20000 AND salary_avg < 300000)').then(function() {
        console.log("DONE UPDATING");
      });
  }
};
