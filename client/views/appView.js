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
      zoomoutFlag: false,
      location: '',
      title: '',
      jobs: new Jobs(),
      allLocs: new Locs(),
      filteredLocs: new Locs(),
      titles: new Titles(),
      errorMessage: '',
      showResults: false
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

  updateSearch: function(location, title, zoomFlag, zoomoutFlag) {
    //no location or title passed in response - reset everything
    if(!location && !title) {
      if(this.state.title) {
        this.locationUpdate(location, title);
      }
      this.clearJobs();
      this.refs.map.resetMap();
    } else {
      this.jobsUpdate(location, title, zoomFlag, zoomoutFlag, false);
    } 

  },

  updateClick: function(location) {
    //always update jobs WITH EXISTING TITLE SEARCH!
    this.jobsUpdate(location, this.state.title, false, false, true);
    if (!this.state.showResults) {
      this.refs.map.shrinkMapWithoutZoom();
      this.state.showResults = true;
    }
  },

  clearJobs: function() {
    this.setState({
      jobs: new Jobs(),
      location: '',
      title: '',
      showResults: false
    });
  },

  jobsUpdate: function(location, title, zoomFlag, zoomoutFlag, clickFlag) {
    var context = this;
    var request = {};
    request.location = location || '';
    request.title = title || '';
    this.state.jobs.fetch({
      traditional: true,
      data: request,
      success: function(jobs) {
        if(jobs.length) {
          context.setState({
            jobs: jobs, 
            location: request.location,
            title: request.title, 
            zoomFlag: zoomFlag, 
            zoomoutFlag: zoomoutFlag,
            errorMessage: ''
          });
          context.handleZoom(location, title, clickFlag);
        } else {
          context.setState({
            zoomFlag: false,
            zoomoutFlag: false,
            errorMessage: 'No jobs found, try another search.'
          });
        }
      }
    });
  },

  handleZoom: function(location, title, clickFlag) {
    if(!clickFlag && (title || this.state.title))  { 
      this.locationUpdate(location, title);
    }
    if (!this.state.showResults) {
      if(!location) {
        this.refs.map.shrinkMapWithoutZoom();
      } else {
        this.refs.map.shrinkMapWithZoom();
      }
      this.setState({
        showResults: true
      });
    }
    //if user is searching a new title in THIS REQUEST
    //OR if user search for a title LAST REQUEST and we need to clear it
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
    if (this.state.showResults) {
      return (
        <div>
          <Nav updateSearch={this.updateSearch} locs={this.state.allLocs} titles={this.state.titles} errorMessage={this.state.errorMessage} ref="nav" />
          <Map updateClick={this.updateClick} locs={this.state.filteredLocs} location={this.state.location} zoomFlag={this.state.zoomFlag} zoomoutFlag={this.state.zoomoutFlag} ref="map" />
          <Selections updateSearch={this.updateSearch} location={this.state.location} title={this.state.title} />
          <Metrics jobs={this.state.jobs} location={this.state.location} locs={this.state.filteredLocs} />
          <JobsList jobs={this.state.jobs} location={this.state.location} title={this.state.title} />
        </div>
      );
    } else {
      return (
        <div>
          <Nav updateSearch={this.updateSearch} locs={this.state.allLocs} titles={this.state.titles} errorMessage={this.state.errorMessage} ref="nav" />
          <Map updateClick={this.updateClick} locs={this.state.filteredLocs} location={this.state.location} zoomFlag={this.state.zoomFlag} ref="map" />
        </div>
      );      
    }
  }

});


module.exports = function() {
  React.render(<AppView />, document.getElementById('main'));
};

