var Backbone = require('backbone');
var LocModel = require('./../models/locModel');
var path = require('path');

// console.log(path.join('//api/locations/all'));

var Locs = Backbone.Collection.extend({
  model: LocModel,

  // url: path.join(String(process.env.HOST), '../api/locations/all')
  url: path.join('//api/locations/all')
  
});

module.exports = Locs;
