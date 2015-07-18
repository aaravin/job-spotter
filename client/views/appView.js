var React = require('react');
var Nav = require('./navigationView');
var JobsList = require('./jobsView');
var MapView = require('./mapView');
var Locs = require('./../collections/locations');
var Jobs = require('./../collections/jobs');

var AppView = React.createClass({

  getInitialState: function() {
    //create new Backbone collection to hold our data
    return { 
      jobs: new Jobs(),
      locs: new Locs()
    }
  },

  jobsUpdate: function(location) {
    console.log("JOBSUPDATE");
    context = this;
    // var url = '/api/jobs/city?city=' + locName
    this.state.jobs.fetch({
      traditional: true,
      data: {cityName: location},
      success: function(jobs) {
        console.log('jobs in success', jobs);
        context.setState({
          jobs: jobs
        })
      }
    })  
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div>
        <Nav />
        <MapView jobsUpdate={this.jobsUpdate} locs={this.state.locs} />
        <JobsList jobs={this.state.jobs} />
      </div>
    );
  }

});


module.exports = function() {
  React.render(<AppView />, document.getElementById('main'));
};

