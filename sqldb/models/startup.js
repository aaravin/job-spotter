var db = require('../config');

var Job = require('./job');
var Role = require('./role');
var Loc = require('./loc');

var Startup = db.Model.extend({
  tableName: 'Startups',
  hasTimestamps: false,
  jobs: function() {
    return this.belongsToMany(Job, 'startup_job', 'Startup_rowId', 'Job_rowId');
  }
});

module.exports = Startup;
