var db = require('../config');

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
