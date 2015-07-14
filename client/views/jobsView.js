
var JobsList = React.createClass({

  render: function() {
    var list = this.props.jobs.map(function(job, index) {
      return <JobListing joblisting={job.attributes} key={index} />
    });
    return (
      <div>
        <h3>Available Jobs</h3>
        <ul> 
          {list}
        </ul>
      </div>
    );
  }

});

