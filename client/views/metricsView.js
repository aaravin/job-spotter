var React = require('react');
var BarChart = require('react-d3/barchart').BarChart;

var Metrics = React.createClass({

  getInitialState: function() {
    return {
      barData: [
        {label: 'City', value: 0},
        {label: 'US', value: 70000}
      ]
    };
  },

  componentWillReceiveProps: function() {
    var barData = [];
    var sumSal = 0;
    var loc = this.props.jobs.at(0).get('locClient');
    this.props.jobs.forEach(function(job) {
      if (job.get('salary') > 20000 && job.get('salary') < 300000) {
        sumSal += job.get('salary');
      }
    });

    var avgSal = sumSal/this.props.jobs.length;

    this.setState({
      barData: [
        {label: loc, value: avgSal},
        {label: 'US', value: 70000}
      ]
    })
  },

  render: function() {
    return (
      <BarChart data={this.state.barData} width={300} height={200} fill={'#ADD8E6'} title='Average Salary' className="col-sm-5 col-sm-offset-1"/>
    );
  }

});

module.exports = Metrics;
