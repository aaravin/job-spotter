var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
// var api = require('indeed-api').getInstance("1508047511307515");
var Link = require('../db/models/link');

var port = process.env.PORT || 8080;

var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/../client"));


// var mainRouter = require('./routes');
// app.use('/', mainRouter);

app.get('/api/jobs', function(req, res) {
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
      resultObj.id = link.attributes.id;
      resultObj.link = link.attributes.link;
      resultObj.title = link.relations.title.attributes.title;
      resultObj.company = link.relations.company.attributes.name;
      resultObj.location = link.relations.location.attributes.city;

      results.push(resultObj);
    }
    // console.log('results', results);

    // send back the results
    res.status(200).send(results);
  });
});

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

