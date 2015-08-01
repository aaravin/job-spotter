/** @jsx React.DOM */
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var expect = require('chai').expect;
var Map = require('../client/views/mapView');


describe("React Testing", function () {
  
  it('Should Test a React Component', function (done) {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Map));

    var component = shallowRenderer.getRenderOutput();
    // console.log(component);

    expect(component.props.id).to.equal('map-canvas');
    expect(component.props.className).to.equal('col-sm-8');
    
    done();
  });
  
});


