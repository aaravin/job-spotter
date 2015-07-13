
var JobsList = React.createClass({
  render: function() {
    var createItem = function(job, index) {
      return 
      <li key={index + job.id}>
        <span>{job.title}</span>
        <span>{job.location}</span>
        <span>{job.company}</span>
        <span>{job.link}</span>
      </li>;
    };
    return <ul>{this.props.jobs.map(job)}</ul>;
  }
});

var JobsApp = React.createClass({
  getInitialState: function() {
    return {jobs: [], title: ''/*, location: '', company: '', link: ''*/};
  },
  onChange: function(e) {
    this.setState({title: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.title]);
    var nextText = '';
    this.setState({jobs: nextItems, title: nextText});
  },
  render: function() {
    return (
      <div>
        <h3>Available Jobs</h3>
        <JobsList jobs={this.state.jobs} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.title} />
          <button>{'Add #' + (this.state.jobs.length + 1)}</button>
        </form>
      </div>
    );
  }
});

// var formData: React.createClass({
//   getInitialState: function() {
//     return {
//       title: 'Developer',
//       location: 'San Francisco, CA',
//       company: 'Hack Reactor',
//       link: 'www.myawesomejob.com'
//     };
//   },

//   render: function() {
//     <form onSubmit={this.handleSubmit}>
//       <input onChange={this.onChange} value={this.state.value} />
//       // <input onChange={this.onChange} value={this.state.title} />
//       // <input onChange={this.onChange} value={this.state.location} />
//       // <input onChange={this.onChange} value={this.state.company} />
//       // <input onChange={this.onChange} value={this.state.link} />
//       <button>{'Add #' + (this.state.jobs.length + 1)}</button>
//     </form>
//   }
// });

React.render(<JobsApp />, document.body);
