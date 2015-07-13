var db = require('../config');

var Link = db.Model.extend({
  tableName: 'links',
  hasTimestamps: true,
  company: function() {
    return this.belongsTo(Company);
  },
  location: function() {
    return this.belongsTo(Location);
  },
  title: function() {
    return this.belongsTo(Title);
  }
});

module.exports = Link;
