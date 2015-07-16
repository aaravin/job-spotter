var db = require('../config');

var Role = require('./role');
var Startup = require('./startup');
var Loc = require('./loc');

var Job = db.Model.extend({
  tableName: 'Jobs',
  hasTimestamps: true,
  startup: function() {
    return this.belongsToMany(Startup, 'startup_job', 'Job_rowId', 'Startup_rowId');
  },
  loc: function() {
    return this.belongsToMany(Loc, 'loc_job', 'Job_rowId', 'Loc_rowId');
  },
  role: function() {
    return this.belongsToMany(Role, 'role_job', 'Job_rowId', 'Role_rowId');
  }
});

module.exports = Job;
