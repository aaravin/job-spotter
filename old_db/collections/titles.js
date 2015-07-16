var db = require('../config');
var Title = require('../models/title');

var Titles = new db.Collection();

Titles.model = Title;

module.exports = Titles;
