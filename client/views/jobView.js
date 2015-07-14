
var JobListing = React.createClass({

  getInitialState: function() {
    return null;
    // return {title: 'Engineer', link: 'www.myawesomething.com', company: 'Hack Reactor', location: 'SF'};
  },

  render: function() {
    console.log('rendering', this.props.joblisting, typeof this.props.jobs);
    return (
    <li className="job-item">
      <span className="job-title">{this.props.joblisting.title}</span>
      <span className="job-company">{this.props.joblisting.company}</span>
      <span className="job-location">{this.props.joblisting.location}</span>
    </li>)
  }
});

