var db = require('../config');
var Startup = require('../models/startup');

var Startups = new db.Collection();

Startups.model = Startup;

module.exports = Startups;
