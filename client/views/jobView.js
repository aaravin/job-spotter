var React = require('react');
var JobListing = React.createClass({

  getInitialState: function() {
    return null;
  },

  render: function() {
    console.log(this.props.jobListing);
    return (
    <li className="job-item">
      <span className="job-title">{this.props.joblisting.title}</span>
      <span className="job-company">{this.props.joblisting.company}</span>
      <span className="job-location">{this.props.joblisting.location}</span>
    </li>)
  }
});

module.exports = JobListing;
