var React = require('react');
var JobListing = require('./jobView');

var JobsList = React.createClass({

  render: function() {
    var count = 0;
    var titleString = '';
    var list = this.props.jobs.map(function(job, index) {
      count++;
      return <JobListing joblisting={job} key={index} />
    });

    if (this.props.jobs.length === 0) {
      titleString = 'No jobs found';
    } else if (this.props.location !== '' && this.props.title === '') {
      titleString = '' + count.toLocaleString() + (count===1 ? ' job ' : ' jobs ') + 'found in ' + this.props.location.toUpperCase();
    } else if (this.props.location === '' && this.props.title !== '') {
      titleString = '' + count.toLocaleString() + (count===1 ? ' job ' : ' jobs ') + 'found related to ' + this.props.title.toUpperCase();
    } else if (this.props.location !== '' && this.props.title !== '') {
      titleString = '' + count.toLocaleString() + (count===1 ? ' job ' : ' jobs ') + 'found in ' + this.props.location.toUpperCase() + ' related to ' + this.props.title.toUpperCase();
    }

    if (this.props.location === '' && this.props.title === '') {
      return (
        <div>
        </div>
      );
    } else {
      return (
        <div className="well row col-sm-10 col-sm-offset-1 jobs-box">
          <div className="title-string">{titleString}</div>
          <div className="jobs-list"> 
            {list}
          </div>
        </div>
      );
    }
  }

});

module.exports = JobsList;
