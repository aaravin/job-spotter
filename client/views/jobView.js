var React = require('react');
var JobListing = React.createClass({

  getInitialState: function() {
    return null;
  },

  render: function() {
    return (
    <li className="job-item">
      <span className="job-title">{this.props.joblisting.get('title')} - </span>
      <span className="job-company">{this.props.joblisting.get('company')} - </span>
      <span className="job-location">{this.props.joblisting.get('locClient')}</span>
    </li>)
  }
});

module.exports = JobListing;
