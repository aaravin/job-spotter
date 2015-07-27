var db = require('../config');
require('./link');
require('./title');
require('./location');

var Company = db.Model.extend({
  tableName: 'companies',
  hasTimestamps: true,
  titles: function() {
    return this.belongsToMany('Title');
  },
  locations: function() {
    return this.belongsToMany('Location');
  },
  links: function() {
    return this.hasMany('Link');
  }
});

module.exports = db.model('Company', Company);
