var React = require('react');
var $ = require('jquery');
require('jquery-ui-browserify');

var Input = React.createClass({

  getInitialState: function() {
    return {
      location: '',
      title: '',      
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
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
    var myData = ["San Francisco", "San Jose", "San Pablo", "San Mateo", "Stanford", "Danville", "Walnut Creek", "Berkeley"];
    $(React.findDOMNode(this.refs.location)).autocomplete({ 
      source: myData,
      appendTo: this,
      create: function (e) {
        $(this).prev('.ui-helper-hidden-accessible').remove();
      }
    });
  },

  render: function() {
    return (
      <div className="col-sm-4 col-sm-offset-3">
        <form type="submit" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.location} onChange={this.searchLocation} placeholder="Enter a Location" ref="location" />
          <input type="text" value={this.state.title} onChange={this.searchTitle} placeholder="Enter a Job Title" />
          <button onClick={this.handleSubmit}>Search Jobs</button>
        </form>
      </div>
    )
  }

});

module.exports = Input;
