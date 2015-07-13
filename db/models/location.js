var db = require('../config');

var Location = db.Model.extend({
  tableName: 'locations',
  hasTimestamps: true,
  companies: function() {
    return this.belongsToMany(Company);
  },
  titles: function() {
    return this.belongsToMany(Title);
  },
  links: function() {
    return this.hasMany(Link);
  }
});

module.exports = Location;
