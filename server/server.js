var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var request = require('request');
// var api = require('indeed-api').getInstance("1508047511307515");
// var Link = require('../old_db/models/link');
var db = require('../legacy_sqldb/config');
var Job = require('../legacy_sqldb/models/job');
var Loc = require('../legacy_sqldb/models/loc');
var Role = require('../legacy_sqldb/models/role');
var Startup = require('../legacy_sqldb/models/startup');

var mainController = require('./controllers/mainController');
var locationController = require('./controllers/locationController');
var titleController = require('./controllers/titleController');

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
app.get('/api/jobs/city', function (req, res, next) {
  console.log('in city route on server');
  locationController.getJobsWithLocation(req, res, next);
});

// app.get('/api/jobs/title', ensureAuthenticated, function (req, res, next) {  // <---- When Authentication is desired
app.get('/api/jobs/title', function (req, res, next) {
  console.log('in title route on server');
  titleController.getJobsWithTitle(req, res, next);
});

app.listen(port);
console.log("Listening on PORT " + port);
