var db = require('../config');

var Link = require('./link');
var Title = require('./title');
var Location = require('./location');

var Company = db.Model.extend({
  tableName: 'companies',
  hasTimestamps: true,
  titles: function() {
    return this.belongsToMany(Title);
  },
  locations: function() {
    return this.belongsToMany(Location);
  },
  links: function() {
    return this.hasMany(Link);
  }
});

module.exports = Company;
