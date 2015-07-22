var Backbone = require('backbone');
var JobModel = require('./../models/jobModel');
var path = require('path');


var Jobs = Backbone.Collection.extend({
  model: JobModel,

  url: path.join('//api/jobs')
  
});

module.exports = Jobs;
