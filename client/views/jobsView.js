var React = require('react');
var JobListing = require('./jobView');

var JobsList = React.createClass({

  handleClick: function() {
    console.log('Am I clicked?');
    this.props.jobs.fetch({
      success: function(data) {
        context.setState({jobData: data});
        context.setMarkers();
      }
    });
  },

  render: function() {
    console.log('rendering in jobsView', this.props.jobs);
    var list = this.props.jobs.map(function(job, index) {
      return <JobListing joblisting={job} key={index} />
    });
    return (
      <div className="row col-sm-10 col-sm-offset-1 text-center">
        <h3 className="">Available Jobs</h3>
        <ul> 
          {list}
        </ul>
      </div>
    );
  }

});

module.exports = JobsList;
