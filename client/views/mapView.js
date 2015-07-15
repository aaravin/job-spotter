var MapView = React.createClass({

  getInitialState: function () {
    return {
      initialZoom: 8,
      mapCenterLat: 43.6425569,
      mapCenterLng: -79.4073126,
    };
  },

  componentDidMount: function() {
    var mapOptions = {
      center: this.mapCenterLatLng(),
      zoom: this.state.initialZoom
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
