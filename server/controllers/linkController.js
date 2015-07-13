var Link = require('../../db/models/link');
var Promise = require('bluebird');
var Title = require('../../db/models/title');
var Company = require('../../db/models/company');
var Location = require('../../db/models/location');

module.exports = {
  getLink: function (req, res, next) {
    // get a single link - do we need this??
  },
  getAllLinks: function (req, res, next) {
    new Link()
      .fetchAll({
        withRelated: ['company', 'location', 'title']
      })
      .then(function (links) {
        var results = [];

        // build the array of links and store into results
        //   each link is an object
        var models = links.models;

        for (var i = 0; i < models.length; i++) {
          var resultObj = {};
          var link = models[i];
          resultObj.id = link.attributes.id;
          resultObj.link = link.attributes.link;
          resultObj.description = link.attributes.description;
          resultObj.title_id = link.attributes.title_id;
          resultObj.company_id = link.attributes.company_id;
          resultObj.location_id = link.attributes.location_id;

          results.push(resultObj);
        }

        // send back the results
        res.status(200).send(results);
      });
  }
};