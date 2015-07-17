var React = require('react');
var Login = require('./loginView');

var Nav = React.createClass({
  
  render: function() {
    return (
      <div className="navbar navbar-inverse navbar-static-top container-fliud" id="navigation">
        <h1 className="navbar-brand">JobSpotter</h1>
        <ul className="nav nav-pills navbar-nav navbar-right">
          <li><a href="#">Signup</a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </div>
    );
  }

});

module.exports = Nav;
