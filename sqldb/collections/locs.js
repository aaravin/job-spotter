var db = require('../config');
var Loc = require('../models/loc');

var Locs = new db.Collection();

Locs.model = Loc;

module.exports = Locs;
