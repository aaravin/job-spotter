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
    var flag = this.state.location ? true : false;
    this.props.jobsUpdate(this.state.location, this.state.title, flag);
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

  componentWillReceiveProps: function() {
    console.log('Received Props');
  },

  autoFill: function() {
    var context = this;
    $(React.findDOMNode(context.refs.location)).autocomplete({ 
      source: context.props.locs.pluck("location"),
      appendTo: this,
      create: function (e) {
        $(this).prev('.ui-helper-hidden-accessible').remove();
      },
      close: function(e) {
        context.setState({location: e.target.value });
      }
    });

    $(React.findDOMNode(context.refs.title)).autocomplete({ 
      source: context.props.titles.pluck("title"),
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
      <div className="navbar navbar-default navbar-static-top" id="navigation">
        <div className="container-fluid">
          <h1 id="title" className="navbar-brand">JobSpotter</h1>
          <form type="submit" onSubmit={this.handleSubmit} className="navbar-form navbar-middle" id="search-form">
            <div className="form-group">
              <input type="text" value={this.state.location} onChange={this.searchLocation} placeholder="Enter a Location" ref="location" className="form-control" id="autocomplete" />
              <input type="text" value={this.state.title} onChange={this.searchTitle} placeholder="Enter a Position" ref="title" className="form-control" id="autocomplete" />
              <button id="search-button" onClick={this.handleSubmit} className="btn btn-default navbar-btn form-control">Search Jobs</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = Nav;
