var React = require('react');
var JobListing = require('./jobView');

var JobsList = React.createClass({

  render: function() {
    var list = this.props.jobs.map(function(job, index) {
      return <JobListing joblisting={job.attributes} key={index} />
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
