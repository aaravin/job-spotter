var React = require('react');
var Login = require('./loginView');
var $ = require('jquery');
require('jquery-ui-browserify');
var Locs = require('./../collections/locations');
var Jobs = require('./../collections/jobs');

var Nav = React.createClass({

  getInitialState: function() {
    return {
      location: '',
      title: '',
      locData: new Locs()
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var zoomFlag = this.state.location ? true : false;
    var zoomoutFlag = !this.state.location && this.state.title ? true : false;
    this.props.updateSearch(this.state.location, this.state.title, zoomFlag, zoomoutFlag);
    this.setState({
      location: '',
      title: ''
    });
  },

  searchLocation: function(e) {
    this.setState({
      location: e.target.value
    });
  },

  searchTitle: function(e) {
    this.setState({
      title: e.target.value
    });
  },

  autoFill: function() {
    var context = this;
    $(React.findDOMNode(context.refs.location)).autocomplete({ 
      source: function(request, response) {
        var results = $.ui.autocomplete.filter(context.props.locs.pluck("location"), request.term);
        response(results.slice(0,10));
      },
      appendTo: this,
      create: function (e) {
        $(this).prev('.ui-helper-hidden-accessible').remove();
      },
      close: function(e) {
        context.setState({location: e.target.value });
      }
    });

    $(React.findDOMNode(context.refs.title)).autocomplete({ 
      source: function(request, response) {
        var results = $.ui.autocomplete.filter(context.props.titles.pluck("title"), request.term);
        response(results.slice(0,10));
      },
      appendTo: this,
      create: function (e) {
        $(this).prev('.ui-helper-hidden-accessible').remove();
      },
      close: function(e) {
        context.setState({title: e.target.value });
      }
    });   
  },
  
  render: function() {
    return (
      <div className="navbar navbar-inverse navbar-static-top" id="navigation">
        <div>
          <h1 id="title" className="navbar-brand">JobSpotter</h1>
          <form type="submit" onSubmit={this.handleSubmit} className="navbar-form navbar-middle" id="search-form">
            <div className="form-group">
              <input type="text" value={this.state.location} onChange={this.searchLocation} placeholder="Enter a Location" ref="location" className="form-control" id="autocomplete" />
              <input type="text" value={this.state.title} onChange={this.searchTitle} placeholder="Enter a Job Title" ref="title" className="form-control" id="autocomplete" />
              <button id="search-button" onClick={this.handleSubmit} className="btn btn-default navbar-btn form-control">Search Jobs</button>
            </div>
          </form>
          <div className="error-message pull-right"> {this.props.errorMessage}</div>
        </div>
      </div>
    );
  }

});

module.exports = Nav;
