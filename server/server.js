var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var request = require('request');
// var api = require('indeed-api').getInstance("1508047511307515");
// var Link = require('../old_db/models/link');
var db = require('../db/config');
var Link = require('../db/models/link');
var Location = require('../db/models/location');
var Title = require('../db/models/title');
var latLongUtil = require('./utils/latLongUtil.js');
var jobCountUtil = require('./utils/jobCountUtil.js');
var locSalaryUtil = require('./utils/locSalaryUtil.js');

var mainController = require('./controllers/mainController');
var filterController = require('./controllers/filterController');

var port = process.env.PORT || 8080;

var app = express();

require('./lib/middleware.js')(app, express); // load up all middlewares


/********************************************************************
 * To turn on LinkedIn Authentication:
 *  - Uncomment the code block below
 *  - Switch the routes to use ensureAuthenticated;
 *    alternate function calls to app.get are provided for each route
 *  - To login navigate to: localhost:8080/auth/LinkedIn
 ********************************************************************/
// var authRouter = require('./auth');
// app.use('/', authRouter);
// var ensureAuthenticated = function (req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   console.log('rejected');
//   res.status(401).end();
// };
/********************************************************************/


app.use(morgan('dev'));
app.use(express.static(__dirname + "/../dist"));

// app.get('/api/locations/all', ensureAuthenticated, function (req, res, next) {  // <---- When Authentication is desired
app.get('/api/locations/all', function (req, res, next) {
  mainController.getAllJobs(req, res, next);
});

// app.get('/api/jobs/city', ensureAuthenticated, function (req, res, next) {  // <---- When Authentication is desired
app.get('/api/jobs', function (req, res, next) {
  console.log('in jobs route on server');
  if (req.query.location && req.query.title) {
    filterController.getJobsWithBoth(req, res, next);
  } else if (req.query.location) {
    filterController.getJobsWithLocation(req, res, next);
  } else if (req.query.title) {
    filterController.getJobsWithTitle(req, res, next);
  } else {
    console.log("No location or title sent in request");
  }
});

// app.get('/api/jobs/title', ensureAuthenticated, function (req, res, next) {  // <---- When Authentication is desired
// app.get('/api/jobs/title', function (req, res, next) {
//   console.log('in title route on server');
//   titleController.getJobsWithTitle(req, res, next);
// });

// RUN ONLY ONCE TO POPULATE LATS AND LONGS
// console.log("GETTING LAT AND LONGS");
// latLongUtil.getAllLocs();

// // Update all jobCounts
// console.log("UPDATING JOB COUNTS");
// jobCountUtil.updateJobCounts();

// // Update all locSalaries
// console.log("UPDATING LOC SALARIES");
// locSalaryUtil.updateLocSalaries();

app.listen(port);
console.log("Listening on PORT " + port);
