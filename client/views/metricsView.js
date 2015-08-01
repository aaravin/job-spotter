var React = require('react');
var BarChart = require('react-d3/barchart').BarChart;
var d3 = require('d3-browserify');

var Metrics = React.createClass({

  getInitialState: function () {
    return {
      salaryData: [
        {label: 'Selected Jobs', value: 0},
        {label: 'All U.S. Cities', value: 0}
      ],
      numberData: [
        {label: 'Selected Jobs', value: 0},
        {label: 'All U.S. Cities', value: 0}
      ]
    };
  },

  updateMetrics: function() {
    var sumSal = 0;
    var locObject = {};

    this.props.jobs.forEach(function (job) {
      if (!locObject[job.get('location')]) {
        locObject[job.get('location')] = 1;
      } else {
        locObject[job.get('location')]++;
      }

      if (job.get('salary_avg') > 20000 && job.get('salary_avg') < 300000) {
        sumSal += job.get('salary_avg');
      }
    });

    var cityName = this.props.jobs.models[0].attributes.location,
        avgSal = parseInt(sumSal / this.props.jobs.length);

    var totalSal = 0;
    var totalNumber = 0;
    var jobCount;

    if (this.props.location !== '') {
      jobCount = this.props.jobs.length;
    } else {
      jobCount = Math.round(this.props.jobs.length / this.props.locs.length);
    }
    this.props.locs.forEach(function (loc) {
      totalSal += loc.get('avgSalary');
      totalNumber += loc.get('jobCount');
    });
    var avgTotalSal = parseInt(totalSal / this.props.locs.length);
    var avgTotalNumber = parseInt(totalNumber / this.props.locs.length);
    // console.log(totalNumber, jobCount);

    this.state.salaryData = [
      {label: 'Selected Jobs', value: avgSal},
      {label: 'All U.S. Cities', value: avgTotalSal}
    ],
    this.state.numberData = [
      {label: 'Selected Jobs', value: jobCount},
      {label: 'All U.S. Cities', value: avgTotalNumber}
    ]
  },

  componentDidMount: function() {
    //set up initial conditions for salary and number charts
    var width = 200;
    var barHeight = 20;

    var data = [0, 0];

    var salaryChart = d3.select(".salaryChart")
      .attr("width", width)
      .attr("height", barHeight * 2);

    var numberChart = d3.select(".numberChart")
      .attr("width", width)
      .attr("height", barHeight * 2);

    var salaryBar = d3.select(".salaryChart").selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    var numberBar = d3.select(".numberChart").selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    salaryBar.append("rect")
      .attr("width", 0)
      .attr("height", barHeight - 1);

    numberBar.append("rect")
      .attr("width", 0)
      .attr("height", barHeight - 1);

    salaryBar.append("text");

    numberBar.append("text");

    this.updateMetrics();
  },

  componentDidUpdate: function () {
    if(this.props.jobs.length) {
      this.updateMetrics();
      this.renderSalaryGraph();
      this.renderNumberGraph();
    }
  },

  renderSalaryGraph: function () {
    var context = this;  // save the component's context to use inside d3 methods

    var salaryData = [context.state.salaryData[0].value, context.state.salaryData[1].value];
    var width = 200;
    var barHeight = 20;

    var x = d3.scale.linear()
      .domain([0, d3.max(salaryData)])
      .range([10, width]);

    d3.select(".salaryChart").selectAll("rect")
      .data(salaryData)
      .transition()
      .duration(1000)
      .attr("width", x)
      .attr("height", barHeight - 1);

    d3.select(".salaryChart").selectAll("text")
      .data(salaryData)
      .text(function(d) {
        return '$' + d.toLocaleString();
      })
      .transition()
      .duration(1000)
      .attr("x", function(d) { return x(d) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em");
  },

  renderNumberGraph: function () {
    var context = this;  // save the component's context to use inside d3 methods
    var numberData = [context.state.numberData[0].value, context.state.numberData[1].value];
    var width = 200;
    var barHeight = 20;

    var x = d3.scale.linear()
      .domain([0, d3.max(numberData)])
      .range([10, width]);

    d3.select(".numberChart").selectAll("rect")
      .data(numberData)
      .transition()
      .duration(1000)
      .attr("width", x)
      .attr("height", barHeight - 1);

    d3.select(".numberChart").selectAll("text")
      .data(numberData)
      .text(function(d) {
        return d.toLocaleString();
      })
      .transition()
      .duration(1000)
      .attr("x", function(d) { return x(d) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em");
  },

  render: function () {
    return (
      <div className="metrics">
        <table id="sal-table">
          <tr>
            <td className="col-label" colSpan="2">Average Salary</td>
          </tr>
          <tr>
            <td className="chart-label">{this.state.salaryData[0].label}</td>
            <td rowSpan="2">
              <div>
                <svg className="salaryChart"></svg>
              </div>
            </td>
          </tr>
          <tr>
            <td className="chart-label">{this.state.salaryData[1].label}</td>
          </tr>
        </table>
        <table id="num-table">
          <tr>
            <td className="col-label" colSpan="2">Average Job Count</td>
          </tr>
          <tr>
            <td className="chart-label">{this.state.numberData[0].label}</td>
            <td rowSpan="2">
              <div>
                <svg className="numberChart"></svg>
              </div>            
            </td>
          </tr>
          <tr>
            <td className="chart-label">{this.state.numberData[1].label}</td>
          </tr>
        </table>
      </div>
    );
  }

});

module.exports = Metrics;
