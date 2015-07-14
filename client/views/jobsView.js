var BackboneMixin = {
  componentDidMount: function () {
    // Whenever there may be a change in the Backbone data, trigger a
    // reconcile.
    this.getBackboneCollections().forEach(function (collection) {
      // explicitly bind `null` to `forceUpdate`, as it demands a callback and
      // React validates that it's a function. `collection` events passes
      // additional arguments that are not functions
      collection.on('add remove change', this.forceUpdate.bind(this, null));
    }, this);
  },

  componentWillUnmount: function () {
    // Ensure that we clean up any dangling references when the component is
    // destroyed.
    this.getBackboneCollections().forEach(function (collection) {
      collection.off(null, null, this);
    }, this);
  }
};

var JobsList = React.createClass({

  mixins: [BackboneMixin],

  getDefaultProps: function() {
    return null;
  },

  getBackboneCollections: function () {
    // console.log([this.props.todos]);
    return [this.props.jobs];
  },

  render: function() {
    console.log(this.props.jobs.at(0));
    console.log(this.getBackboneCollections());
    return (
      <div>
        <h1>Jobs</h1>
        <ul> 
          this.getBackboneCollections().map(function(job) {
            <JobListing joblisting={job.attributes} />
          }, this)
        </ul>
      </div>
    );
  }

});

React.render(<JobsList jobs={app.get('jobs')} />, document.body);
