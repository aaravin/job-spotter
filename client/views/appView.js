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
      location: '',
      jobs: new Jobs(),
      locs: new Locs()
    }
  },

  jobsUpdate: function(location, title) {
    var context = this;
    var request = {};
    if(location) {
      request.location = location;
    }
    if(title) {
      request.title = title;
    }

    this.setState({
      location: location
    })

    this.state.jobs.fetch({
      traditional: true,
      data: request,
      success: function(jobs) {
        context.setState({
          jobs: jobs,
        });
      }
    })  
  },


  componentDidMount: function() {

  },

  render: function() {
    return (
      <div>
        <Nav jobsUpdate={this.jobsUpdate} />
        <Map jobsUpdate={this.jobsUpdate} locs={this.state.locs} location={this.state.location} />
        <Metrics jobs={this.state.jobs} />
        <JobsList jobs={this.state.jobs} />
      </div>
    );
  }

});


module.exports = function() {
  React.render(<AppView />, document.getElementById('main'));
};

