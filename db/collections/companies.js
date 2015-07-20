var db = require('../config');
var Company = require('../models/company');

var Companies = new db.Collection();

Companies.model = Company;

module.exports = Companies;
