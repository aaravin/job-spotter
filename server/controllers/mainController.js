var Promise = require('bluebird');
var Loc = require('../../sqldb/models/loc');

module.exports = {
  getAllJobs: function (req, res, next) {
    console.log("Sending locations to /api/jobs/all");
    var allLocs = [];
    new Loc()
    .fetchAll()
    .then(function (locs) {
      var models = locs.models;

      for (var i = 0; i < models.length; i++) {
        var loc = models[i];
        var city;

        if (loc.attributes.name && loc.attributes.latitude && loc.attributes.longitude) {
          if (loc.attributes.name === "washington,_dc") {
            city = "Washington, DC";
          } else {
            city = loc.attributes.name.replace(/_/g, " ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
          }

          allLocs[i] = {
            loc: loc.attributes.name,
            city: city,
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

