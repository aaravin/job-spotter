var React = require('react');
var Nav = require('./navigationView');
var JobsList = require('./jobsView');
var Map = require('./mapView');
var Input = require('./inputView');
var Locs = require('./../collections/locations');
var Jobs = require('./../collections/jobs');
var Metrics = require('./metricsView');

var AppView = React.createClass({

  getInitialState: function() {
    //create new Backbone collections to hold our data
    return { 
      zoomFlag: false,
      location: '',
      title: '',
      jobs: new Jobs(),
      locs: new Locs()
    }
  },

  jobsUpdate: function(location, title, zoomFlag) {
    var context = this;
    var request = {};
    request.location = location || '';
    request.title = title || '';

    this.state.jobs.fetch({
      traditional: true,
      data: request,
      success: function(jobs) {
        context.setState({
          jobs: jobs, 
          zoomFlag: zoomFlag, 
          location: request.location,
          title: request.title
        });
      }
    });

  },

  render: function() {
    return (
      <div>
        <Nav jobsUpdate={this.jobsUpdate} />
        <Map jobsUpdate={this.jobsUpdate} locs={this.state.locs} location={this.state.location} zoomFlag={this.state.zoomFlag} />
        <JobsList jobs={this.state.jobs} location={this.state.location} title={this.state.title} />
      </div>
    );
  }

});


module.exports = function() {
  React.render(<AppView />, document.getElementById('main'));
};

