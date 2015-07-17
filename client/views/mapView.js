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

  setMarkers: function() {
    var context = this;
    _.each(this.state.cityData, function(city) {
      console.log(city.jobCount.toString());
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(city.latitude, city.longitude),
        map: context.state.map,
        title: city.jobCount.toString() + " JOBS HERE!!!"
      });
    })
  },

  componentDidMount: function() {
    //Hardcoded Entire US initial coordinates 
    this.getCityData();

    var mapOptions = {
      center: new google.maps.LatLng(39.83, -98.58),
      zoom: 4
    };
    var map = new google.maps.Map(this.getDOMNode(), mapOptions);

    // var marker = new google.maps.Marker({
    //   position: new google.maps.LatLng(39, -98),
    //   map: map
    // });

    // var marker2 = new google.maps.Marker({
    //   position: new google.maps.LatLng(36, -98),
    //   map: map
    // });

    // var marker3 = new google.maps.Marker({
    //   position: new google.maps.LatLng(36, -112),
    //   map: map
    // });

    // var marker4 = new google.maps.Marker({
    //   position: new google.maps.LatLng(38, -122),
    //   map: map
    // });

    // var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});
    this.setState({map: map});
  },

  mapCenterLatLng: function () {
    var props = this.props;
    return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
  },

  render: function() {
    return (
      <div id="map-canvas"></div>
    )
  }

});

module.exports = MapView;
