var db = require('../config');

var Job = require('./job');
var Startup = require('./startup');
var Loc = require('./loc');

var Role = db.Model.extend({
  tableName: 'Roles',
  hasTimestamps: true,
  startups: function() {
    return this.belongsToMany(Startup);
  },
  locs: function() {
    return this.belongsToMany(Loc);
  },
  jobs: function() {
    return this.belongsToMany(Job);
  }
});

module.exports = Role;
