var React = require('react');
var BarChart = require('react-d3/barchart').BarChart;
var d3 = require('d3-browserify');

var Metrics = React.createClass({

  getInitialState: function() {
    return {
      barData: [
        // {label: 'City', value: 10000},
        {label: 'US', value: 70000}
      ]
    };
  },

  componentWillReceiveProps: function() {

    // var barData = [];
    var sumSal = 0;

    var location = this.props.jobs.models[0].attributes.location;

    this.props.jobs.forEach(function(job) {
      if (job.get('salary_avg') > 20000 && job.get('salary_avg') < 300000) {
        sumSal += job.get('salary_avg');
      }
    });

    var avgSal = sumSal / this.props.jobs.length;

    this.setState({
      barData: [
        {label: location, value: avgSal},
        {label: 'US', value: 70000}
      ]
    });

    // Pure D3 only below this line
    var cityData = this.state.barData;
    console.log('cityData', cityData);
    var data = [cityData[0].value, 70000];
    console.log('data', data);

    var width = 300,
        barHeight = 20;

    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, width]);

    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", x)
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function(d) { return x(d) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d; });
  },

  render: function() {
    return (
      // <svg className="chart" ></svg>
      <BarChart data={this.state.barData} width={300} height={200} fill={'#ADD8E6'} title='Average Salary' />
      // <div className="col-sm-1">This is Metrics View</div>
      // <div className="col-sm-2">This is Metrics View</div>

    );
  }

});

module.exports = Metrics;
