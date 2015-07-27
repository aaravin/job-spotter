var React = require('react');
var Nav = require('./navigationView');
var JobsList = require('./jobsView');
var Map = require('./mapView');
var Input = require('./inputView');
var Selections = require('./selectionsView');
var Metrics = require('./metricsView');
var Locs = require('./../collections/locations');
var Jobs = require('./../collections/jobs');
var Titles = require('./../collections/titles');

var AppView = React.createClass({

  getInitialState: function() {
    //create new Backbone collections to hold our data
    return { 
      zoomFlag: false,
      location: '',
      title: '',
      jobs: new Jobs(),
      allLocs: new Locs(),
      filteredLocs: new Locs(),
      titles: new Titles()
    }
  },

  componentDidMount: function() {
    var context = this;
    this.state.filteredLocs.fetch({
      success: function(locs) {
        context.state.filteredLocs = locs;
        context.refs.map.setMarkers();
      }
    });

    this.state.allLocs.fetch({
      success: function(locs) {
        context.state.titles.fetch({
          success: function(titles) {
            context.state.allLocs = locs;
            context.state.titles = titles;
            context.refs.nav.autoFill();
          }
        });
      }
    });
  },

  updateSearch: function(location, title, zoomFlag) {
    //no location or title passed in response - reset everything
    if(!location && !title) {
      if(this.state.title) {
        this.locationUpdate(location, title);
      }
      this.setState({
        zoomFlag: zoomFlag
      });
      this.clearJobs();
    } else {
      //reset jobs always
      this.jobsUpdate(location, title);
      //reset map? - maybe
      this.setState({
        zoomFlag: zoomFlag
      });
      if(title || this.state.title) { 
        //if user is searching a new title in THIS REQUEST
        //OR if user search for a title LAST REQUEST and we need to clear it
        this.locationUpdate(location, title);
      } 
    }
  },

  updateClick: function(location) {
    //always update jobs WITH EXISTING TITLE SEARCH!
    this.jobsUpdate(location, this.state.title);
    this.setLocationTitle(location, this.state.title);
  },

  clearJobs: function() {
    this.setState({
      jobs: new Jobs(),
      location: '',
      title: ''
    });
  },

  jobsUpdate: function(location, title) {
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
          location: location,
          title: title
        });
      }
    });
  },

  locationUpdate: function(location, title) {
    var context = this;
    this.state.filteredLocs.fetch({
      traditional: true,
      data: {title: title},
      success: function(newLocs) {
        context.state.filteredLocs = newLocs;
        context.refs.map.setMarkers();
      }
    });
  },

  render: function() {
    return (
      <div>
        <Nav updateSearch={this.updateSearch} locs={this.state.allLocs} titles={this.state.titles} ref="nav" />
        <Map updateClick={this.updateClick} locs={this.state.filteredLocs} location={this.state.location} zoomFlag={this.state.zoomFlag} ref="map" />
        <Selections updateSearch={this.updateSearch} location={this.state.location} title={this.state.title} />
        <Metrics jobs={this.state.jobs} locs={this.state.filteredLocs} />
        <JobsList jobs={this.state.jobs} location={this.state.location} title={this.state.title} />
      </div>
    );
  }

});


module.exports = function() {
  React.render(<AppView />, document.getElementById('main'));
};

