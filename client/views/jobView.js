var React = require('react');
var JobListing = React.createClass({

  getInitialState: function() {
    return null;
  },

  render: function() {
    return (
    <div className="job-item">
      <div className="job-location">
        <div className="loc-icon"><img className="loc-img" src="https://maps.google.com/mapfiles/ms/icons/red-dot.png" height="18" width="18" /></div>
        <span className="loc-text">{this.props.joblisting.get('location')}</span>
      </div>
      <div className="job-company">{this.props.joblisting.get('company')}</div>
      <div className="job-sal-equity">
        <span className="job-sal">${this.props.joblisting.get('salary_min').toLocaleString().split(',')[0]}k - ${this.props.joblisting.get('salary_max').toLocaleString().split(',')[0]}k</span>
        <span>  |  </span>
        <span className="job-equity">{this.props.joblisting.get('equity')}</span>
      </div>
      <div className="job-title">{this.props.joblisting.get('title')}</div>
      <div className="job-skills">{this.props.joblisting.get('skills')}</div>
      <div className="job-link"><a href={this.props.joblisting.get('link')} target="_blank">{this.props.joblisting.get('link')}</a></div>
    </div>)
  }
});

module.exports = JobListing;
