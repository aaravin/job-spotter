var db = require('../config');

var Job = require('./job');
var Role = require('./role');
var Startup = require('./startup');

var Loc = db.Model.extend({
  tableName: 'Locs',
  hasTimestamps: false,
  jobs: function() {
    return this.belongsToMany(Job, 'loc_job', 'Loc_rowId', 'Job_rowId');
  }
});

module.exports = Loc;
