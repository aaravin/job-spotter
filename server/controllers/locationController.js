var Location = require('../../db/models/location');
var Promise = require('bluebird');

module.exports = {
  getAllLocations: function (req, res, next) {
    new Location()
      .fetchAll({})
      .then(function (locations) {
        var results = [];

        var models = locations.models;

        // build each location and store as an object onto the results array
        for (var i = 0; i < models.length; i++) {
          var resultObj = {};
          var location = models[i];
          resultObj.id = location.attributes.id;
          resultObj.city = location.attributes.city;
          resultObj.state = location.attributes.state;
          resultObj.country = location.attributes.country;
          resultObj.latitude = location.attributes.latitude;
          resultObj.longitude = location.attributes.longitude;

          results.push(resultObj);
        }

        // send back the results
        res.status(200).send(results);
      });
  }
};

