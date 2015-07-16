var db = require('../config');
var Role = require('../models/role');

var Roles = new db.Collection();

Roles.model = Role;

module.exports = Roles;
