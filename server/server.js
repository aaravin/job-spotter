var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var api = require('indeed-api').getInstance("1508047511307515");

var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/../client"));

var port = process.env.PORT || 8080;

app.listen(port);
console.log("Listening on PORT " + port);

var tempData = [
  {"title":"UI Designer", "company": "General Motors", "location": "Detroit, MI"},
  {"title":"Frontend Developer", "company": "Apple", "location": "San Francisco, CA"},
  {"title":"Engineer", "company": "Venmo", "location": "New York, NY"},
  {"title":"Garbage Man", "company": "Twitter", "location": "Austin, TX"}];

app.get('/api/jobs', function(req, res) {
  res.json(tempData);
});

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

