var Promise = require('bluebird');
var Loc = require('../../sqldb/models/loc');

module.exports = {
  getAllJobs: function (req, res, next) {
    console.log("Sending locations to /api/jobs/all");
    var allLocs = {};
    new Loc()
    .fetchAll()
    .then(function (locs) {
      var models = locs.models;

      for (var i = 0; i < models.length; i++) {
        var loc = models[i];
        if (loc.attributes.latitude && loc.attributes.longitude) {
          allLocs[loc.attributes.name] = {
            jobCount: loc.attributes.jobcount,
            latitude: loc.attributes.latitude,
            longitude: loc.attributes.longitude,
            avgSalary: loc.attributes.avg_salary
          }
        }
      }
      res.status(200).send(allLocs);
    });
  }

};

