var db = require('../config');

var Job = require('./job');
var Role = require('./role');
var Loc = require('./loc');

var Startup = db.Model.extend({
  tableName: 'Startups',
  hasTimestamps: true,
  roles: function() {
    return this.belongsToMany(Role);
  },
  locs: function() {
    return this.belongsToMany(Loc);
  },
  jobs: function() {
    return this.belongsToMany(Job);
  }
});

module.exports = Startup;
