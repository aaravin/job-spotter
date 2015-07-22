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
    var context = this;
    this.props.locs.fetch({
      success: function() {
        context.setMarkers();
      }
    });
  },

  setMarkers: function() {
    var context = this;
    var prevWindow = false;
    var markers = [];
    console.log(this.state.map ? 'map exists in setMarkers' : 'does not exist');

    this.props.locs.forEach(function(city, index) {
      console.log('going through each city in setMarkers');
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
          context.props.jobsUpdate(city.get('location'));
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

  // componentWillReceiveProps: function() {
  //   console.log(this.props.location);
  //   this.buildMapLocal();
  // },

  // buildMapLocal: function() {

  //   var mapOptions = {
  //     center: this.mapCenterLatLng(),
  //     zoom: 5
  //   };
  //   var map = new google.maps.Map(this.getDOMNode(), mapOptions);

  //   this.setState({map: map});
  //   this.setMarkers();
  // },

  buildMap: function() {

    var mapOptions = {
      center: this.mapCenterLatLng(),
      zoom: 4
    };
    var map = new google.maps.Map(this.getDOMNode(), mapOptions);

    this.setState({map: map});
  },

  mapCenterLatLng: function () {
    if(this.props.location) {
      console.log('I have a location selected', this.props.location);
      var context = this;
      this.props.locs.forEach(function(loc) {
        if(loc.get("location").toUpperCase() === context.props.location.toUpperCase()) {
          console.log("I found the location:", loc.get("location"), loc.get("latitude"), loc.get("longitude"));
          context.setState({
             mapCenterLat: loc.get("latitude"),
             mapCenterLng: loc.get("longitude")
          });
        }
      });
    } 
    console.log(this.state.mapCenterLat, this.state.mapCenterLng);
    return new google.maps.LatLng(this.state.mapCenterLat, this.state.mapCenterLng);
  },

  render: function() {
    return (
      <div id="map-canvas" className="col-sm-8 col-sm-offset-2"></div>
    )
  }

});

module.exports = Map;
