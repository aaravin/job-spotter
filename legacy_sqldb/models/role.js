var db = require('../config');

var Job = require('./job');
var Startup = require('./startup');
var Loc = require('./loc');

var Role = db.Model.extend({
  tableName: 'Roles',
  hasTimestamps: false,
  jobs: function() {
    return this.belongsToMany(Job, 'role_job', 'Role_rowId', 'Job_rowId');
  }
});

module.exports = Role;
