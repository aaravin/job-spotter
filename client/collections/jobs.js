var Backbone = require('backbone');
var JobModel = require('./../models/jobModel');
var path = require('path');

// console.log(path.join('//api/locations/all'));

var Jobs = Backbone.Collection.extend({
  model: JobModel,

  // url: path.join(String(process.env.HOST), '../api/jobs')
  url: path.join('//api/jobs')
  
});

module.exports = Jobs;
