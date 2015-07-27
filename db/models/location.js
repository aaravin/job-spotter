var db = require('../config');
require('./link');
require('./title');
require('./company');

var Location = db.Model.extend({
  tableName: 'locations',
  hasTimestamps: true,
  companies: function() {
    return this.belongsToMany('Company');
  },
  titles: function() {
    return this.belongsToMany('Title', 'titles_locations', 'location_id', 'title_id');
  },
  links: function() {
    return this.hasMany('Link');
  }
});

module.exports = db.model('Location', Location);
