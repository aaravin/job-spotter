var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
// var api = require('indeed-api').getInstance("1508047511307515");
var Job = require('../sqldb/models/job');

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
        resultObj.location = link.relations.loc.models[0].attributes.name.replace(/_/g, " ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

        results.push(resultObj);
      }
    }
    console.log("Got all jobs!");
  });
};

app.get('/api/jobs', function(req, res) {
  console.log("Sending jobs to /api/jobs");
  res.status(200).send(results);
  console.log("Jobs sent");
});


getAllJobs();
app.listen(port);
console.log("Listening on PORT " + port);


/* REFERENCES OLD VERSION of database, models, and schema
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
      var resultObj = {};
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
*/


/* Ashwin:
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

