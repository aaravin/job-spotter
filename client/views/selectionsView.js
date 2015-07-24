var React = require('react');
var Selections = React.createClass({

  handleClickLoc: function() {
    console.log('Location clicked!', this.props.title, this.props.location);
    this.props.jobsUpdate(null, this.props.title, false);
  },

  handleClickTitle: function() {
    console.log('Title clicked!', this.props.title, this.props.location);
    this.props.jobsUpdate(this.props.location, null, false);
  },

  render: function() {
    return (
    <div className="selections col-sm-2">
      <div className="selector-location" onClick={this.handleClickLoc}>{this.props.location}</div>
      <div className="selector-title" onClick={this.handleClickTitle}>{this.props.title}</div>
    </div>)
  }
});

module.exports = Selections;
