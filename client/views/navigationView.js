var Nav = React.createClass({
  
  render: function() {
    return (
      <div className="nav nav-bar">
        <h1>JobSpotter</h1>
        <a href="#">Signup</a>
        <a href="#">Login</a>
        <a href="#">About</a>
      </div>
    );
  }

});

React.render(<Nav />, document.getElementById('nav'));
