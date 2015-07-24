var React = require('react');
var BarChart = require('react-d3/barchart').BarChart;
var d3 = require('d3-browserify');

var Metrics = React.createClass({

  getInitialState: function () {
    return {
      stateCount: 0,
      barData: [
        {label: '', value: 0},
        {label: 'U.S.', value: 70000}
      ]
    };
  },

  componentWillReceiveProps: function () {
    var sumSal = 0;

    this.props.jobs.forEach(function (job) {
      if (job.get('salary_avg') > 20000 && job.get('salary_avg') < 300000) {
        sumSal += job.get('salary_avg');
      }
    });

    var cityName = this.props.jobs.models[0].attributes.location,
          avgSal = parseInt(sumSal / this.props.jobs.length);

    this.setState({
      stateCount: this.state.stateCount + 1,
      barData: [
        {label: cityName, value: avgSal},
        {label: 'U.S.', value: 70000}
      ]
    });
  },

  componentDidUpdate: function () {
    this.renderD3();
  },

  renderD3: function () {
    var context = this;  // save the component's context to use inside d3 methods

    var data = [context.state.barData[0].value, 70000];

    var width = 300,
        barHeight = 20;

    var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, width]);

    d3.select(".chart").selectAll("g")
      .data([])
      .exit().remove();

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
      .text(function (data, index) {
        return context.state.barData[index].label + " $" + String(data).replace(/./g, function(c, i, a) {
          return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
          });
      });
  },

  render: function () {
    return (
      <div>
        <div className="col-sm-12 col-sm-offset-4">Average Salary</div>
        <div className="col-sm-1 col-sm-offset-2"></div>
        <svg className="chart"></svg>
      </div>
      // <BarChart data={this.state.barData} width={300} height={200} fill={'#ADD8E6'} title='Average Salary' />
      // <div className="col-sm-1">This is Metrics View</div>
      // <div className="col-sm-2">This is Metrics View</div>

    );
  }

});

module.exports = Metrics;
