var Company = require('../../db/models/company');
var Promise = require('bluebird');

module.exports = {
  getAllCompanies: function (req, res, next) {
    new Company()
      .fetchAll({})
      .then(function (companies) {
        var results = [];

        var models = companies.models;

        // build each company and store as an object onto the results array
        for (var i = 0; i < models.length; i++) {
          var resultObj = {};
          var company = models[i];

          resultObj.id = company.attributes.id;
          resultObj.name = company.attributes.name;

          results.push(resultObj);
        }

        // send back the results
        res.status(200).send(results);
      });
  }
};