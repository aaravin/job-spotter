var db = require('../config');
require('./title');
require('./company');
require('./location');

var Link = db.Model.extend({
  tableName: 'links',
  hasTimestamps: true,
  company: function() {
    return this.belongsTo('Company','company_id');
  },
  location: function() {
    return this.belongsTo('Location', 'location_id');
  },
  title: function() {
    return this.belongsTo('Title', 'title_id');
  }
});

module.exports = db.model('Link', Link);
