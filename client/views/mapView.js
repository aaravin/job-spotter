var React = require('react');
var $ = require('jquery');
var _ = require('underscore');

var Map = React.createClass({

  getInitialState: function () {
    return {
      initialZoom: 8,
      mapCenterLat: 39.8282,
      mapCenterLng: -98.5795, 
      markers: [],
      markerCluster: null,
      prevInfoWindow: null
    };
  },

  componentDidMount: function() {
    this.buildMap();
  },

  setMarkers: function() {
    var context = this;
    var prevWindow = false;

    if(this.state.markers.length) {
      _.each(this.state.markers, function(marker) {
        marker.setMap(null);
        marker = null;
      });
      this.state.markers = [];
      if(this.state.markerCluster) {
        this.state.markerCluster.clearMarkers();
      }
    }
    
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
          if(context.state.prevInfoWindow) {
            context.state.prevInfoWindow.close();
          }
          marker.setOpacity(0.7);
          infowindow.open(context.state.map, marker);
          context.state.prevInfoWindow = infowindow;
          context.props.updateClick(city.get('location'));
        });

        context.state.markers.push(marker);
        
      }
    });

    this.state.markerCluster = new MarkerClusterer(this.state.map, this.state.markers);

    //add click event to close all banners when map area is clicked
    google.maps.event.addListener(this.state.map, "click", function() {
      if(context.state.prevInfoWindow) {
        context.state.prevInfoWindow.close();
        context.state.prevInfoWindow = null;
      }
    });

  },

  zoomToCity: function() {
    this.state.map.panTo(this.mapCenterLatLng());
    this.state.map.setZoom(12);
  },

  zoomOutCenter: function() {
    this.state.map.panTo(this.mapCenterLatLng());
    this.state.map.setZoom(4);
  },

  buildMap: function() {
    var mapOptions = {
      center: this.mapCenterLatLng(),
      zoom: 4
    };
    var map = new google.maps.Map(this.getDOMNode(), mapOptions);
    google.maps.event.addDomListener(map, 'idle', function() {});
    this.setState({map: map});
  },

  resetMap: function() {
    var context = this;

    if (context.state.prevInfoWindow) {
      context.state.prevInfoWindow.close();
      context.state.prevInfoWindow = null;
    }

    $('#map-canvas').animate({
      height: "91vh",
      width: "100%",
      marginTop: "0px",
      marginLeft: "0px"
    }, {
      duration: 2000,
      step: function(currentHeight) {
        google.maps.event.trigger(context.state.map, 'resize');
        context.state.map.panTo(context.mapCenterLatLng());
        context.state.map.setZoom(4);
      }
    })
  },

  shrinkMapWithZoom: function() {
    var context = this;

    $("#map-canvas").animate({
      height: "500px",
      width: "65%",
      marginTop: "5px",
      marginLeft: "5px"
    }, {
      duration: 2000,
      step: function(currentHeight) {
        google.maps.event.trigger(context.state.map, "resize");
        context.state.map.panTo(context.mapCenterLatLng());
        context.state.map.setZoom(12);
      }
    });
  },

  shrinkMapWithoutZoom: function() {
    var context = this;
    var center = this.state.map.getCenter();

    $("#map-canvas").animate({
      height: "500px",
      width: "65%",
      marginTop: "5px",
      marginLeft: "5px"
    }, {
      duration: 2000,
      step: function(currentHeight) {
        google.maps.event.trigger(context.state.map, "resize");
        context.state.map.panTo(center);
      }
    });
  },

  mapCenterLatLng: function () {
    var zoomLocation;
    if(this.props.location !== '') {
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
    } else if(this.props.zoomoutFlag) {
      this.zoomOutCenter();
    }
    return (
      <div id="map-canvas" className="col-sm-8"></div>
    )
  }

});

module.exports = Map;
