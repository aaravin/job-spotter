var Promise = require('bluebird');
var Loc = require('../../db/models/location');
var _ = require('underscore');

module.exports = {
  getAllJobs: function (req, res, next) {
    console.log("Sending locations to /api/locations/all");
    var allLocs = [];
    new Loc()
    .fetchAll()
    .then(function (locs) {
      var models = locs.models;

      var jobData = _.map(models, function(model) {
        return {
          location: model.get('city'),
          jobCount: model.get('jobCount'),
          latitude: model.get('latitude'),
          longitude: model.get('longitude'),
          avgSalary: model.get('avgSalary')
        }
      });

      res.status(200).send(jobData);
    });
  }

};

