var Location = require('../../db/models/location');
var db = require('../../db/config.js');

module.exports = {
  updateJobCounts: function() {
    db.knex.raw('UPDATE locations SET jobCount = \
      (SELECT COUNT(*) FROM links WHERE links.location_id = locations.id)').then(function() {
        console.log("DONE UPDATING");
      });
  }
};
