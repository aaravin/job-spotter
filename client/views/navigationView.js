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
    console.log(e);
    this.props.jobsUpdate(this.state.location, this.state.title);
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

  componentDidMount: function() {
    var context = this;
    this.state.locData.fetch({
      success: function(data) {
        $(React.findDOMNode(context.refs.location)).autocomplete({ 
          source: data.models.map(function(item) { return item.get("location"); }),
          appendTo: this,
          create: function (e) {
            $(this).prev('.ui-helper-hidden-accessible').remove();
            // console.log(e);
            // context.setState({location: e.target.value});
          },
          // select: function(e) {
          //   console.log(e.target.value);
          //   context.setState({location: e.target.value});
          // },
          // change: function(e) {
          //   console.log("CHANGE: ", e.target.value);
          // },
          close: function(e) {
            console.log("CLOSE: ", e.target.value);
            context.setState({location: e.target.value });
          }
        });   
      }
    });
  },
  
  render: function() {
    return (
      <div className="navbar navbar-default navbar-static-top" id="navigation">
        <div className="container-fluid">
          <h1 className="navbar-brand">JobSpotter</h1>
          <form type="submit" onSubmit={this.handleSubmit} className="navbar-form navbar-middle">
            <div class="form-group">
              <input type="text" value={this.state.location} onChange={this.searchLocation} placeholder="Enter a Location" ref="location" className="form-control"/>
              <input type="text" value={this.state.title} onChange={this.searchTitle} placeholder="Enter a Job Title" ref="title" className="form-control"/>
              <button onClick={this.handleSubmit} className="btn btn-default navbar-btn form-control">Search Jobs</button>
            </div>
          </form>
          <ul className="nav nav-pills navbar-nav navbar-right">
            <li><a href="#">About</a></li>
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = Nav;
