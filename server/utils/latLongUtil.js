var Location = require('../../db/models/location');
var request = require('request');

module.exports = {
  getAllLocs: function() {
    new Location()
    .fetchAll()
    .then(function(locs) {
      var models = locs.models;

      var i = 0;
      function myLoop() {
        setTimeout(function() {
          var resultObj = {};
          var loc = models[i];
          var location = loc.attributes.city.replace(/ /g, "+");
          request('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyCtxIISUlZmMbiwDOUdvRVyqFcqGyr5RF8', function(error, response, body) {
            if (!error && response.statusCode == 200 && JSON.parse(body).results[0]) {
              resultObj[loc.attributes.name] = {
                lat: JSON.parse(body).results[0].geometry.location.lat,
                lng: JSON.parse(body).results[0].geometry.location.lng
              }
              loc.set("latitude", JSON.parse(body).results[0].geometry.location.lat);
              loc.set("longitude", JSON.parse(body).results[0].geometry.location.lng);
              loc.save();
            } else {
              console.log(error, i);
            }
            i++;
            if (i < models.length) {
              myLoop();
            }
          });
        }, 500)
      }

      myLoop();
    })
  }
}