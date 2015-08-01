/** @jsx React.DOM */
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var expect = require('chai').expect;

var Map = require('../client/views/mapView');
var Selections = require('../client/views/selectionsView');
// var App = require('../client/views/appView');
// var JobsList = require('../client/views/jobsView');
// var JobListing = require('../client/views/jobView');
// var Metrics = require('../client/views/metricsView');
// var Nav = require('../client/views/navigationView');

describe("React Testing", function () {

  it('Should Have a MapView Component', function (done) {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Map));

    var component = shallowRenderer.getRenderOutput();
    // console.log(component);

    expect(component.props.id).to.equal('map-canvas');
    expect(component.props.className).to.equal('col-sm-8');
    
    done();
  });

  it('Should Have a SelectionsView Component', function (done) {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Selections));

    var component = shallowRenderer.getRenderOutput();
    // console.log(component.props);
    // console.log(component.props.children);

    expect(component.props.className).to.equal('selections col-sm-3');
    expect(component.props.children.length).to.be.greaterThan(0);
    
    done();
  });

/********************************************************************
 * TESTS BELOW not working with React and Mocha
 *  - browersify and require statements not parsing with Mocha
 *  - may require using another method such as mocking the DOM
 ********************************************************************/
  /*
  it('Should Have an AppView Component', function (done) {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(App));

    var component = shallowRenderer.getRenderOutput();
    console.log(component);

    // expect(component.props.id).to.equal('');
    // expect(component.props.className).to.equal('');
    
    done();
  });

  it('Should Have a JobsList Component', function (done) {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(JobsList));

    var component = shallowRenderer.getRenderOutput();
    console.log(component);

    // expect(component.props.id).to.equal('');
    // expect(component.props.className).to.equal('');
    
    done();
  });

  it('Should Have a JobListing Component', function (done) {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(JobListing));

    var component = shallowRenderer.getRenderOutput();
    console.log(component);

    // expect(component.props.id).to.equal('');
    // expect(component.props.className).to.equal('');
    
    done();
  });

  it('Should Have a MetricsView Component', function (done) {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Metrics));

    var component = shallowRenderer.getRenderOutput();
    console.log(component);

    // expect(component.props.id).to.equal('');
    // expect(component.props.className).to.equal('');
    
    done();
  });

  it('Should Have a NavigationView Component', function (done) {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Nav));

    var component = shallowRenderer.getRenderOutput();
    console.log(component);

    // expect(component.props.id).to.equal('');
    // expect(component.props.className).to.equal('');
    
    done();
  });
  */
  
});
