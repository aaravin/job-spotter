var Backbone = require('backbone');
var LocModel = require('./../models/titleModel');
var path = require('path');


var Titles = Backbone.Collection.extend({
  model: TitleModel,

  url: path.join('//api/titles/all')
  
});

module.exports = Titles;
