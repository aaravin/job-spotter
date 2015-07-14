var AppView = React.createClass({

  getInitialState: function() {
    //create new Backbone collection to hold our data
    return {
      jobs: new Jobs() 
    }
  },

  update: function(jobs) {
    //resetting state will trigger a render() event with the new jobs data
    this.setState({
      jobs: jobs
    });
  },

  componentDidMount: function() {
    var context = this;
    //make AJAX request to server for all jobs -- URL defined in Backbone collection
    this.state.jobs.fetch({ 
      //on success, send the data to update function to trigger a setState change
      success: function(data) {
                  context.update(data);
               }
    });
  },

  render: function() {
    return (
      <div>
        <JobsList jobs={this.state.jobs} />
      </div>
    );
  }

});

React.render(<AppView />, document.getElementById('main'));
