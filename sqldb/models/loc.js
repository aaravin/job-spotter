var db = require('../config');

var Job = require('./job');
var Role = require('./role');
var Startup = require('./startup');

var Loc = db.Model.extend({
  tableName: 'Locs',
  hasTimestamps: true,
  startups: function() {
    return this.belongsToMany(Startup);
  },
  roles: function() {
    return this.belongsToMany(Role);
  },
  jobs: function() {
    return this.belongsToMany(Job);
  }
});

module.exports = Loc;
