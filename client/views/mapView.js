var MapView = React.createClass({

  getInitialState: function () {
    return {
      initialZoom: 8,
      mapCenterLat: 43.6425569,
      mapCenterLng: -79.4073126,
    };
  },

  componentDidMount: function() {
    //Hardcoded Entire US initial coordinates 
    var mapOptions = {
      center: new google.maps.LatLng(39.83, -98.58),
      zoom: 4
    },
    map = new google.maps.Map(this.getDOMNode(), mapOptions);
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
