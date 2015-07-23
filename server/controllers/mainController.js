var Promise = require('bluebird');
var Loc = require('../../db/models/location');
var Title = require('../../db/models/title');
var _ = require('underscore');

module.exports = {
  getAllJobs: function (req, res, next) {
    console.log("Sending locations to /api/locations/all");
    var allLocs = [];
    new Loc()
    .fetchAll()
    .then(function (locs) {
      var models = locs.models;

      var cityData = _.map(models, function(model) {
        return {
          location: model.get('city'),
          jobCount: model.get('jobCount'),
          latitude: model.get('latitude'),
          longitude: model.get('longitude'),
          avgSalary: model.get('avgSalary')
        }
      });

      res.status(200).send(cityData);
    });
  },

  getAllTitles: function (req, res, next) {
    console.log("Sending locations to /api/titles/all");
    var allTitles = [];
    new Title()
    .fetchAll()
    .then(function (titles) {
      var models = titles.models;

      var titleData = _.map(models, function(model) {
        return {
          title: model.get('title')
        }
      });

      res.status(200).send(titleData);
    });
  }

};

