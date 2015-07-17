var Backbone = require('backbone');
var LocModel = require('./../models/locModel')

var Locs = Backbone.Collection.extend({
  model: LocModel,

  url: 'http://localhost:8080/api/jobs/all',
  
});

module.exports = Jobs;
