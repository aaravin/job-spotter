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

  jobsUpdate: function(jobs) {
    console.log("JOBSUPDATE");
    this.setState({
      jobs: new Jobs(jobs)
    })
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div>
        <Nav />
        <MapView update={this.jobsUpdate} jobs={this.state.jobs} locs={this.state.locs} />
        <JobsList jobs={this.state.jobs} />
      </div>
    );
  }

});


module.exports = function() {
  React.render(<AppView />, document.getElementById('main'));
};

