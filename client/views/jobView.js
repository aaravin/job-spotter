var React = require('react');
var JobListing = React.createClass({

  getInitialState: function() {
    return null;
  },

  render: function() {
    return (
    <ul className="job-item">
      <span className="job-title">{this.props.joblisting.get('title')} - </span>
      <span className="job-company">{this.props.joblisting.get('company')} - </span>
      <span className="job-sal-min">Min Sal: ${this.props.joblisting.get('salary_min')} - </span>
      <span className="job-sal-max">Max Sal: ${this.props.joblisting.get('salary_max')} - </span>
      <span className="job-equity">Equity: {this.props.joblisting.get('equity')} - </span>
      <span className="job-skills">Skills: {this.props.joblisting.get('skills')} - </span>
      <span className="job-link"><a href={this.props.joblisting.get('link')} target="_blank">Job Link</a> - </span>
      <span className="job-location">{this.props.joblisting.get('location')}</span>
    </ul>)
  }
});

module.exports = JobListing;
