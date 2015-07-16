var db = require('../config');

var Title = require('./title');
var Company = require('./company');
var Location = require('./location');

var Link = db.Model.extend({
  tableName: 'links',
  hasTimestamps: true,
  company: function() {
    return this.belongsTo(Company,'company_id');
  },
  location: function() {
    return this.belongsTo(Location, 'location_id');
  },
  title: function() {
    return this.belongsTo(Title, 'title_id');
  }
});

module.exports = Link;
