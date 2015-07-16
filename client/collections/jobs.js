var Backbone = require('backbone');
var JobModel = require('./../models/jobModel')

var Jobs = Backbone.Collection.extend({
  model: JobModel,

  url: 'http://localhost:8080/api/jobs',
  
});

module.exports = Jobs;
