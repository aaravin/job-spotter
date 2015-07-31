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

  //make initial AJAX requests once element is mounted on the DOM
  componentDidMount: function() {
    var context = this;
    this.state.filteredLocs.fetch({ //filtered locs holds locations that will be shown on the map
      success: function(locs) {
        context.state.filteredLocs = locs;
        context.refs.map.setMarkers();
      }
    });

    /*allLocs and titles must be fetched separately; they will be used to populate
    the autofill feature in the search boxes.
    React does NOT allow filteredLocs and allLocs to be set to the same collection
    at the same time, otherwise these calls would be executed above in order to 
    avoid data/"source of truth" duplication.*/
    this.state.allLocs.fetch({
      success: function(locs) {
        context.state.titles.fetch({
          success: function(titles) {
            context.setState({
              allLocs: locs,
              titles: titles
            });
            context.refs.nav.autoFill();
          }
        });
      }
    });
  },


  //any user submission from the navigation input form is routed here
  updateSearch: function(location, title, zoomFlag, zoomoutFlag) {
    //no location or title passed in response - reset everything
    if(!location && !title) {
      if(this.state.title) {
        this.locationUpdate(location, title);
      }
      this.clearJobs();
      this.refs.map.resetMap();
    } else {  //if a title or location is provided, attempt to update jobs
      this.jobsUpdate(location, title, zoomFlag, zoomoutFlag, false);
    } 
  },

  //any user click to a map marker is routed here
  updateClick: function(location) {
    //always update jobs with existing title search! Do not delete the user's title selection on a click
    this.jobsUpdate(location, this.state.title, false, false, true);
  },

  //helper function to remove all user/title selections; map will be reset to full screen
  clearJobs: function() {
    this.setState({
      jobs: new Jobs(),
      location: '',
      title: '',
      showResults: false
    });
  },

  //jobsUpdate is called after each user map click or navigation form submission
  jobsUpdate: function(location, title, zoomFlag, zoomoutFlag, clickFlag) {
    var context = this;
    var request = {};
    request.location = location || '';
    request.title = title || '';
    this.state.jobs.fetch({ //fetch new jobs with user title and location input (or '' if empty)
      traditional: true,
      data: request,
      success: function(jobs) {
        if(jobs.length) { //set state when new jobs are received
          context.handleZoom(location, title, clickFlag);
          context.setState({
            jobs: jobs, 
            location: request.location,
            title: request.title, 
            zoomFlag: zoomFlag, 
            zoomoutFlag: zoomoutFlag,
            // filteredLocs: context.state.filteredLocs,
            errorMessage: ''
          });
        } else { //handle empty responses with a message to the user
          context.setState({
            zoomFlag: false,
            zoomoutFlag: false,
            errorMessage: 'No jobs found, try another search.'
          });
        }
      }
    });
  },

  /*check whether app should zoom in or out (or neither),
  and whether map markers should be updated*/
  handleZoom: function(location, title, clickFlag) {
    //update displayed locations if user did NOT click
    //and there was a title requested this search OR last search
    //(if a title was requested this search, restrict locations,
    // if a title was requested last search, exapnd locations back to full)
    if(!clickFlag && (title || this.state.title))  { 
      this.locationUpdate(location, title);
    }
    if (!this.state.showResults) { //shrink map if a selection is made for the first time
      if(!location || clickFlag) { //do not zoom if no location is selected
        this.refs.map.shrinkMapWithoutZoom();
      } else { //zoom to location if one is provided
        this.refs.map.shrinkMapWithZoom();
      }
      this.setState({ //set flag so that shrinkMap is not called again until all selections are cleared
        showResults: true
      });
    }
  },

  //helper function to get new locations when a title is requested 
  //(only show locations with selected title)
  locationUpdate: function(location, title) {
    var context = this;
    this.state.filteredLocs.fetch({
      traditional: true,
      data: {title: title},
      success: function(newLocs) {
        context.setState({
          filteredLocs: newLocs
        });
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

