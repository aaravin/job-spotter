var React = require('react');

var Input = React.createClass({

  getInitialState: function() {
    return {
      location: '',
      title: '',      
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
    console.log('submitting', this.state.title, this.state.location);
    this.props.jobsUpdateTitle(this.state.title);
    this.setState({
      location: '',
      title: ''
    });
  },

  searchLocation: function(e) {
    this.setState({
      location: e.target.value
    });
  },

  searchTitle: function(e) {
    this.setState({
      title: e.target.value
    });
  },

  render: function() {
    return (
      <div className="col-sm-4 col-sm-offset-3">
        <form type="submit" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.location} onChange={this.searchLocation} placeholder="Enter a Location" />
          <input type="text" value={this.state.title} onChange={this.searchTitle} placeholder="Enter a Job Title" />
          <button onClick={this.handleSubmit}>Search Jobs</button>
        </form>
      </div>
    )
  }

});

module.exports = Input;
