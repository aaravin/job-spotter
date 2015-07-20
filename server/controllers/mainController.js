var Promise = require('bluebird');
var Loc = require('../../legacy_sqldb/models/loc');

module.exports = {
  getAllJobs: function (req, res, next) {
    console.log("Sending locations to /api/locations/all");
    var allLocs = [];
    new Loc()
    .fetchAll()
    .then(function (locs) {
      var models = locs.models;

      for (var i = 0; i < models.length; i++) {
        var loc = models[i];
        var locClient;

        if (loc.attributes.name && loc.attributes.latitude && loc.attributes.longitude) {
          //if Washington, DC, don't use normal regex because it removes substring after ','
          if (loc.attributes.name === "washington,_dc") {
            locClient = "Washington, DC";
          } else {
            locClient = loc.attributes.name.replace(/_/g, " ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
          }

          allLocs[i] = {
            locServer: loc.attributes.name,
            locClient: locClient,
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

