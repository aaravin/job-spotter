var Promise = require('bluebird');
var db = require('../../db/config.js');
var Loc = require('../../db/models/location');
var Link = require('../../db/models/link');
var Title = require('../../db/models/title');
var _ = require('underscore');

module.exports = {
  getAllLocs: function (req, res, next) {
    console.log("Sending locations to /api/locations/all");

    var allLocs = [];
    new Loc()
    .fetchAll()
    .then(function (locs) {
      if(!locs) {
        return res.status(404).send();
      }
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

  getLocsWithTitle: function(req, res, next) {
    console.log("Sending locations to /api/locations/all with title", req.query.title);

    db.knex.raw("SELECT DISTINCT locations.city as location, locations.latitude, locations.longitude, COUNT(location_id) \
    as jobCount, AVG(salary_avg) as avgSalary FROM links  \
    LEFT JOIN locations ON links.location_id = locations.id \
    WHERE title_id IN \
    (SELECT id FROM titles WHERE title LIKE '%" + req.query.title + "%') \
    GROUP BY location_id")
    .then(function(data) {
      if(!data[0]) {
        return res.status(404).send();
      }
      var collection = data[0];
      var cityData = _.map(collection, function(locInfo) {
        return {
          location: locInfo.location,
          jobCount: locInfo.jobCount,
          latitude: locInfo.latitude,
          longitude: locInfo.longitude,
          avgSalary: locInfo.avgSalary
        }
      });

      res.status(200).send(cityData);
    });

  },

  getAllTitles: function (req, res, next) {
    console.log("Sending titles to /api/titles/all");
    var allTitles = [];
    new Title()
    .fetchAll()
    .then(function (titles) {
      if(!titles) {
        return res.status(404).send();
      }
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

