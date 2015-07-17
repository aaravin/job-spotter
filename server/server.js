var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var request = require('request');
// var api = require('indeed-api').getInstance("1508047511307515");
var Link = require('../old_db/models/link');
var db = require('../sqldb/config');
var Job = require('../sqldb/models/job');
var Loc = require('../sqldb/models/loc');
var Role = require('../sqldb/models/role');
var Startup = require('../sqldb/models/startup');

var mainController = require('./controllers/mainController');
var locationController = require('./controllers/locationController');
var titleController = require('./controllers/titleController');

var port = process.env.PORT || 8080;

var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/../dist"));

app.get('/api/locations/all', function (req, res, next) {
  // route name may change in the future
  //   - the purpose is to get all jobs by location
  mainController.getAllJobs(req, res, next);
});

app.get('/api/jobs/city', function (req, res, next) {
  // console.log("You selected the route for", req.params.cityname, "- the controller for fetching this data is missing.");
  // res.send("You selected the route for " + String(req.params.cityname) + " - the controller for fetching this data is missing.");
  locationController.getJobsWithLocation(req, res, next);
});

app.get('/api/jobs/title', function (req, res, next) {
  // console.log("You selected the route for", req.params.titlename, "- the controller for fetching this data is missing.");
  // res.send("You selected the route for " + String(req.params.cityname) + " - the controller for fetching this data is missing.");
  titleController.getJobsWithTitle(req, res, next);
});

app.listen(port);
console.log("Listening on PORT " + port);
