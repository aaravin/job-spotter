var Title = require('../../db/models/title');
var Promise = require('bluebird');

module.exports = {
  getAllTitles: function (req, res, next) {
    new Title()
      .fetchAll({})
      .then(function (titles) {
        var results = [];

        var models = titles.models;

        // build each company and store as an object onto the results array
        for (var i = 0; i < models.length; i++) {
          var resultObj = {};
          var title = models[i];

          resultObj.id = title.attributes.id;
          resultObj.title = title.attributes.title;

          results.push(resultObj);
        }

        // send back the results
        res.status(200).send(results);
      });
  }
};