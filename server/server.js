var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var request = require('request');
var db = require('../db/config');
var latLongUtil = require('./utils/latLongUtil.js');
var jobCountUtil = require('./utils/jobCountUtil.js');
var locSalaryUtil = require('./utils/locSalaryUtil.js');
var dbInitUtil = require('./utils/dbInitUtil.js');
var dbSetupUtil = require('./utils/dbSetupUtil.js');

var mainController = require('./controllers/mainController');
var jobsController = require('./controllers/jobsController');
var CronJob = require('cron').CronJob;

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
app.use("/splash", express.static(__dirname + "/../landingpage"));

// app.get('/api/locations/all', ensureAuthenticated, function (req, res, next) {  // <---- When Authentication is desired
app.get('/api/locations/all', function (req, res, next) {
  if(req.query.title) {
    mainController.getLocsWithTitle(req, res, next);
  } else {
    mainController.getAllLocs(req, res, next);
  }
});

app.get('/api/titles/all', function (req, res, next) {
  mainController.getAllTitles(req, res, next);
});

// app.get('/api/jobs/city', ensureAuthenticated, function (req, res, next) {  // <---- When Authentication is desired
app.get('/api/jobs', function (req, res, next) {
  console.log('in jobs route on server');
  if (req.query.location && req.query.title) {
    jobsController.getJobsWithBoth(req, res, next);
  } else if (req.query.location) {
    jobsController.getJobsWithLocation(req, res, next);
  } else if (req.query.title) {
    jobsController.getJobsWithTitle(req, res, next);
  } else {
    console.log("No location or title sent in request - 404");
    res.status(200).send(null);
  }
});

// Wake up data server at 11pm
var cronJob1 = new CronJob({
  cronTime: '00 00 02 * * 0-6',
  onTick: function() {
    console.log("Waking up data server...");
    request('https://glacial-waters-2127.herokuapp.com/', function(error, response, body) {
      console.log("Data server awake!");
    });
  },
  start: false,
  timeZone: "America/Los_Angeles"
});

// Ping data server to ensure it stays awake:
//   +40 minutes from start of previous cronJob
var cronJob2 = new CronJob({
  cronTime: '00 40 02 * * 0-6',
  onTick: function() {
    console.log("Keeping data server awake...");
    request('https://glacial-waters-2127.herokuapp.com/', function(error, response, body) {
      console.log("Data server kept awake!");
    });
  },
  start: false,
  timeZone: "America/Los_Angeles"
})

// Reset database and schema:
//   +33 minutes from start of previous cronJob
var cronJob3 = new CronJob({
  cronTime: '00 13 03 * * 0-6',
  onTick: function() {
    console.log("Resetting database...");
    dbInitUtil.setupSchema();
  },
  start: false,
  timeZone: "America/Los_Angeles"
});

// Update database with newly scraped data:
//   +2 minutes from start of previous cronJob
var cronJob4 = new CronJob({
  cronTime: '00 15 03 * * 0-6',
  onTick: function() {
    console.log("Updating db with data from data server...");
    dbSetupUtil.setupDB();
  },
  start: false,
  timeZone: "America/Los_Angeles"
});

// Call Google Maps API to populate latitudes and longitudes:
//   +15 minutes from start of previous cronJob
var cronJob5 = new CronJob({
  cronTime: '00 30 03 * * 0-6',
  onTick: function() {
    console.log("Updating latitudes and longitudes...");
    latLongUtil.getAllLocs();
  },
  start: false,
  timeZone: "America/Los_Angeles"
});

// Call Google Maps API to populate job counts and salaries:
//   +5 minutes from start of previous cronJob
var cronJob6 = new CronJob({
  cronTime: '00 35 03 * * 0-6',
  onTick: function() {
    console.log("Updating job counts and salaries...");
    jobCountUtil.updateJobCounts();
    locSalaryUtil.updateLocSalaries();
  },
  start: false,
  timeZone: "America/Los_Angeles"
});

/********************************************************
 * WARNING: cronJobs will run on local host if active
 *          - database will drop tables and attempt reset
 ********************************************************/
// cronJob1.start();
// cronJob2.start();
// cronJob3.start();
// cronJob4.start();
// cronJob5.start();
// cronJob6.start();

app.listen(port);
console.log("Listening on PORT " + port);
