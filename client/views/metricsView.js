var React = require('react');
var BarChart = require('react-d3/barchart').BarChart;
var d3 = require('d3-browserify');

var Metrics = React.createClass({

  getInitialState: function () {
    return {
      salaryData: [
        {label: 'City', value: 0},
        {label: 'U.S.', value: 0}
      ],
      numberData: [
        {label: 'City', value: 0},
        {label: 'U.S.', value: 0}
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

    var totalSal = 0;
    var totalNumber = 0;
    var jobCount = this.props.jobs.length;
    this.props.locs.forEach(function (loc) {
        totalSal += loc.get('avgSalary');
        totalNumber += loc.get('jobCount');
    });
    var avgTotalSal = parseInt(totalSal / this.props.locs.length);
    var avgTotalNumber = parseInt(totalNumber / this.props.locs.length);


    this.setState({
      salaryData: [
        {label: cityName, value: avgSal},
        {label: 'U.S.', value: avgTotalSal}
      ],
      numberData: [
        {label: cityName, value: jobCount},
        {label: 'U.S.', value: avgTotalNumber}
      ]
    });
  },

  componentDidMount: function() {
    // var totalSal = 0;
    // var totalNumber = 0;

    // this.props.locs.forEach(function (loc) {
    //     totalSal += loc.get('avgSalary');
    //     totalNumber += loc.get('jobCount');
    // });
    // var avgTotalSal = parseInt(totalSal / this.props.locs.length);
    // var avgTotalNumber = parseInt(totalNumber / this.props.locs.length);

    // this.setState({
    //   salaryData: [
    //     {label: '', value: 0},
    //     {label: 'U.S.', value: avgTotalSal}
    //   ],
    //   numberData: [
    //     {label: '', value: 0},
    //     {label: 'U.S.', value: avgTotalNumber}
    //   ]
    // });

    this.renderSalaryGraph();
    this.renderNumberGraph();
  },

  componentDidUpdate: function () {
    this.renderSalaryGraph();
    this.renderNumberGraph();
  },

  renderSalaryGraph: function () {
    var context = this;  // save the component's context to use inside d3 methods

    var salaryData = [context.state.salaryData[0].value, context.state.salaryData[1].value];

    var width = 200,
        barHeight = 25;

    var x = d3.scale.linear()
      .domain([0, d3.max(salaryData)])
      .range([0, width]);

    d3.select(".salaryChart").selectAll("g")
      .data([])
      .exit().remove();

    var chart = d3.select(".salaryChart")
      .attr("width", width)
      .attr("height", barHeight * salaryData.length);

    var bar = chart.selectAll("g")
      .data(salaryData)
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
        return "$" + data.toLocaleString();
      });
  },

  renderNumberGraph: function () {
    var context = this;  // save the component's context to use inside d3 methods

    var numberData = [context.state.numberData[0].value, context.state.numberData[1].value];

    var width = 200,
        barHeight = 25;

    var x = d3.scale.linear()
      .domain([0, d3.max(numberData)])
      .range([0, width]);

    d3.select(".numberChart").selectAll("g")
      .data([])
      .exit().remove();

    var chart = d3.select(".numberChart")
      .attr("width", width)
      .attr("height", barHeight * numberData.length);

    var bar = chart.selectAll("g")
      .data(numberData)
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
        return data.toLocaleString();
      });
  },

  render: function () {
    // if (this.state.salaryData[0].label === '') {
    //   return (<div></div>)
    // } else {
      return (
        <div id="metrics">
          <table id="sal-table">
            <tr>
              <td className="col-label" colSpan="2">Average Salary</td>
            </tr>
            <tr>
              <td>{this.state.salaryData[0].label}</td>
              <td rowSpan="2">
                <div>
                  <svg className="salaryChart"></svg>
                </div>
              </td>
            </tr>
            <tr>
              <td>{this.state.salaryData[1].label}</td>
            </tr>
          </table>
          <table id="num-table">
            <tr>
              <td className="col-label" colSpan="2">Average Job Count</td>
            </tr>
            <tr>
              <td>{this.state.numberData[0].label}</td>
              <td rowSpan="2">
                <div>
                  <svg className="numberChart"></svg>
                </div>            
              </td>
            </tr>
            <tr>
              <td>{this.state.numberData[1].label}</td>
            </tr>
          </table>
        </div>
        // <BarChart data={this.state.barData} width={300} height={200} fill={'#ADD8E6'} title='Average Salary' />
        // <div className="col-sm-1">This is Metrics View</div>
        // <div className="col-sm-2">This is Metrics View</div>

      );
    // }
  }

});

module.exports = Metrics;
