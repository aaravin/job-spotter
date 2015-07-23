var Backbone = require('backbone');
var LocModel = require('./../models/locModel');
var path = require('path');


var Locs = Backbone.Collection.extend({
  model: LocModel,

  url: path.join('//api/locations/all')
  
});

module.exports = Locs;
