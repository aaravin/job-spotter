var React = require('react');
var $ = require('jquery');
var _ = require('underscore');

var MapView = React.createClass({

  getInitialState: function () {
    return {
      initialZoom: 8,
      mapCenterLat: 43.6425569,
      mapCenterLng: -79.4073126,
    };
  },

  getCityData: function() {
    var context = this;
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/api/jobs/all",
      data: {
        format: "json"
      },
      success: function(data) {
        context.setState({cityData: data});
        context.setMarkers();
      }
    });
  },

  testTrigger: function() {
    alert("TEST TRIGGER");
  },

  setMarkers: function() {
    var context = this;

    _.each(this.state.cityData, function(city, cityName) {
      console.log(city);


      var contentString = "<div>" +
          "<h1>" + cityName + "</h1>" +
          "<a href=" + '"#"'  + ">" + city.jobCount + " jobs available here!" + "</a>" +
          "<p>" + "Average Salary: " + city.avgSalary + "</p>"
        "</div>";

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(city.latitude, city.longitude),
        map: context.state.map,
        title: city.jobCount.toString() + " JOBS HERE!!!"
      });

      google.maps.event.addListener(marker, "click", function() {
        infowindow.open(context.state.map, marker);
        $.ajax({
          type: "GET",
          url: "http://localhost:8080/api/jobs/city/" + cityName,
          data: {
            format: "json"
          },
          success: function(data) {
            console.log(data);
          }
        });
      });
    });
  },

  componentDidMount: function() {
    this.getCityData();

    var mapOptions = {
      center: new google.maps.LatLng(39.83, -98.58),
      zoom: 4
    };
    var map = new google.maps.Map(this.getDOMNode(), mapOptions);

    this.setState({map: map});
  },

  mapCenterLatLng: function () {
    var props = this.props;
    return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
  },

  render: function() {
    return (
      <div id="map-canvas" className="col-sm-6 col-sm-offset-2 row container"></div>
    )
  }

});

module.exports = MapView;
