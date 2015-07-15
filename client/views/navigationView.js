var Nav = React.createClass({
  
  render: function() {
    return (
      <div class="nav nav-bar">
        <h1>JobSpotter</h1>
        <div>Signup</div>
        <div>Login</div>
        <div>About</div>
      </div>
    );
  }

});

React.render(<nav />, document.getElementById('nav'));
