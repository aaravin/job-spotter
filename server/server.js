var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var request = require('request');
// var api = require('indeed-api').getInstance("1508047511307515");
var Link = require('../db/models/link');
var db = require('../sqldb/config');
var Job = require('../sqldb/models/job');
var Loc = require('../sqldb/models/loc');
var Role = require('../sqldb/models/role');
var Startup = require('../sqldb/models/startup');

var port = process.env.PORT || 8080;

var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/../client"));

var results = [];

var getAllJobs = function() {
  console.log("Getting all jobs...");
  new Job()
  .query({where: {currency: 'USD'}})
  .fetchAll({
    withRelated: ['startup', 'loc', 'role']
  })
  .then(function (jobs) {
    console.log("getting attributes");
    var models = jobs.models;

    for (var i = 0; i < models.length; i++) {
      var resultObj = {};
      var link = models[i];
      if (link.relations.startup.models[0] && link.relations.loc.models[0]) {
        resultObj.id = link.attributes.id;
        resultObj.title = link.attributes.name;
        resultObj.company = link.relations.startup.models[0].attributes.name;
        var location = link.relations.loc.models[0].attributes.name.replace(/_/g, " ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        if (location === "Washington, Dc") {
          location = "Washington, DC";
        } else {
          location = location.split(',')[0];
        }
        resultObj.location = location;

        results.push(resultObj);
      }
    }
    console.log("Got all jobs!");
  });
}

var getAllLocs = function() {
  new Loc()
  .fetchAll()
  .then(function(locs) {
    var models = locs.models;

    var i = 0;
    function myLoop() {
      setTimeout(function() {
        var resultObj = {};
        var loc = models[i];
        var location = loc.attributes.name.replace(/_/g, " ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).replace(/ /g, "+");
        request('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyCtxIISUlZmMbiwDOUdvRVyqFcqGyr5RF8', function(error, response, body) {
          if (!error && response.statusCode == 200 && JSON.parse(body).results[0]) {
            resultObj[loc.attributes.name] = {
              lat: JSON.parse(body).results[0].geometry.location.lat,
              lng: JSON.parse(body).results[0].geometry.location.lng
            }
            loc.set("latitude", JSON.parse(body).results[0].geometry.location.lat);
            loc.set("longitude", JSON.parse(body).results[0].geometry.location.lng);
            loc.save();
          } else {
            console.log(error, i);
          }
          i++;
          if (i < models.length) {
            myLoop();
          }
        });
      }, 500)
    }

    myLoop();
  })
}


app.get('/sql/jobs', function(req, res) {
  new Link()
  .fetchAll({
    withRelated: ['company', 'location', 'title']
  })
  .then(function (links) {
    console.log('REQUEST TO SERVER ROUTE: /api/jobs');
    var results = [];

    var models = links.models;

    // build each link and store as an object onto the results array
    //   do not build the last model because it has data with undefined fields
    for (var i = 0; i < models.length - 1; i++) {
      var link = models[i];
      console.log(link);
      resultObj.id = link.attributes.id;
      resultObj.link = link.attributes.link;
      resultObj.title = link.relations.title.attributes.title;
      resultObj.company = link.relations.company.attributes.name;
      resultObj.location = link.relations.location.attributes.city;

      results.push(resultObj);
    }

    // send back the results
    res.status(200).send(results);
  });
});

app.get('/api/jobs', function(req, res) {
  console.log("Sending jobs to /api/jobs");
  res.status(200).send(results);
  console.log("Jobs sent");
});

// getAllJobs();  //DON'T UNCOMMENT THIS
// getAllLocs();  //DON'T UNCOMMENT THIS
app.listen(port);
console.log("Listening on PORT " + port);

/*
api.JobSearch()
  .Limit(30)
  .WhereLocation({
    city : "San Francisco",
    state : "CA"
  })
    .SortBy("date")
    .UserIP("1.2.3.4")
    .UserAgent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36")
    .Search(
        function (results) {
        // do something with the success results 
        // console.log(results);
        // console.log(results.results.length);
    },
        function (error) {
        // do something with the error results 
        console.log(error);
    });
*/