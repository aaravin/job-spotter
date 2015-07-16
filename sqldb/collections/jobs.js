var db = require('../config');
var Job = require('../models/job');

var Jobs = new db.Collection();

Jobs.model = Job;

module.exports = Jobs;
