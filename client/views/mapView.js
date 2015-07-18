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

  componentDidMount: function() {
    this.buildMap();
    var context = this;

    this.props.locs.fetch({
      success: function() {
        context.setMarkers();
      }
    });
  },

  testTrigger: function() {
    alert("TEST TRIGGER");
  },

  setMarkers: function() {
    var context = this;
    var prevWindow = false;

    this.props.locs.forEach(function(city, index) {

      var contentString = "<div>" +
          "<h1>" + city.get("locClient") + "</h1>" +
          "<a href=" + '"#"'  + ">" + city.get("jobCount") + " jobs available here!" + "</a>" +
          "<p>" + "Average Salary: " + city.get("avgSalary") + "</p>"
        "</div>";

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      setTimeout(function(){

        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(city.get("latitude"), city.get("longitude")),
          map: context.state.map,
          // icon: 'http://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png',
          // size: new google.maps.Size(40, 40),
          animation: google.maps.Animation.DROP,
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
          context.props.jobsUpdate(city.get('locServer'));
        });

      }, 1*index);
      
    });

    //add click event to close all banners when map area is clicked
    google.maps.event.addListener(this.state.map, "click", function() {
      if(prevWindow) {
        prevWindow.close();
        prevWindow = false;
      }
    });

  },

  buildMap: function() {

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
