var Promise = require('bluebird');

module.exports = {
  startDataExtraction: function (req) {
    return new Promise(function (resolve, reject) {
      resolve(req);
    });
  },
  sendBackData: function(req, res, next) {
    res.status(200).send(req);
  }
};