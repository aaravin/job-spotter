var db = require('../config');
require('./link');
require('./company');
require('./location');

var Title = db.Model.extend({
  tableName: 'titles',
  hasTimestamps: true,
  companies: function() {
    return this.belongsToMany('Company');
  },
  locations: function() {
    return this.belongsToMany('Location', 'titles_locations', 'title_id', 'location_id');
  },
  links: function() {
    return this.hasMany('Link');
  }
});

module.exports = db.model('Title', Title);
