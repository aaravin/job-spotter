var React = require('react');
var $ = require('jquery');
var _ = require('underscore');

var Map = React.createClass({

  getInitialState: function () {
    return {
      initialZoom: 8,
      mapCenterLat: 39.8282,
      mapCenterLng: -98.5795
    };
  },

  componentDidMount: function() {
    this.buildMap();
  },

  setMarkers: function() {
    var context = this;
    var prevWindow = false;
    var markers = [];

    this.props.locs.forEach(function(city, index) {
      if (city.get("jobCount")) {
        var contentString = 
          "<div>" + 
            "<h1>" + city.get("location") + "</h1>" +
            "<p>" + city.get("jobCount").toLocaleString() + (city.get("jobCount")>1 ? " jobs " : " job ")  + "available here!" + "</p>" +
            "<p>" + "Average Salary: $" + city.get("avgSalary").toLocaleString() + "</p>"
          "</div>";

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(city.get("latitude"), city.get("longitude")),
          map: context.state.map,
          // icon: 'http://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png',
          // size: new google.maps.Size(40, 40),
          // animation: google.maps.Animation.DROP,
          title: city.get('jobCount') + " JOBS HERE!!!"
        });

        //add click event to show banner on each marker
        google.maps.event.addListener(marker, "click", function() {
          //close any other window/banner if one is open
          if(prevWindow) {
            prevWindow.close();
          }
          infowindow.open(context.state.map, marker);
          prevWindow = infowindow;
          context.props.jobsUpdate(city.get('location'), null, false);
        });

        markers.push(marker);
        
      }
    });

    var markerCluster = new MarkerClusterer(this.state.map, markers);

    //add click event to close all banners when map area is clicked
    google.maps.event.addListener(this.state.map, "click", function() {
      if(prevWindow) {
        prevWindow.close();
        prevWindow = false;
      }
    });

  },

  zoomToCity: function() {
    this.state.map.panTo(this.mapCenterLatLng());
    this.state.map.setZoom(12);
  },

  buildMap: function() {
    var mapOptions = {
      center: this.mapCenterLatLng(),
      zoom: 4
    };
    var map = new google.maps.Map(this.getDOMNode(), mapOptions);
    this.setState({map: map});
  },

  mapCenterLatLng: function () {
    var zoomLocation;
    if(this.props.location) {
      var context = this;
      this.props.locs.forEach(function(loc) {
        if(loc.get("location").toUpperCase() === context.props.location.toUpperCase()) {
          zoomLocation = new google.maps.LatLng(loc.get("latitude"), loc.get("longitude"));
        }
      });
    } 
    return zoomLocation || new google.maps.LatLng(this.state.mapCenterLat, this.state.mapCenterLng);
  },

  render: function() {
    if(this.props.zoomFlag) {
      this.zoomToCity();
    }
    return (
      <div id="map-canvas" className="col-sm-8"></div>
    )
  }

});

module.exports = Map;
