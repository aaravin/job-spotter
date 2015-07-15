var db = require('../config');

var Link = require('./link');
var Company = require('./company');
var Location = require('./location');

var Title = db.Model.extend({
  tableName: 'titles',
  hasTimestamps: true,
  companies: function() {
    return this.belongsToMany(Company);
  },
  locations: function() {
    return this.belongsToMany(Location);
  },
  links: function() {
    return this.hasMany(Link);
  }
});

module.exports = Title;
