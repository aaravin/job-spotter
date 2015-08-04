var React = require('react');
var Selections = React.createClass({

  handleClickLoc: function() {
    this.props.updateSearch(null, this.props.title, false, true);
  },

  handleClickTitle: function() {
    this.props.updateSearch(this.props.location, null, false, false);
  },

  render: function() {
    if (this.props.location === '' && this.props.title === '') {
      return (
        <div className="selections">
          <div className="filterLabel">Search Filters</div>
        </div>)
    } else if (this.props.location !== '' && this.props.title !== '') {
      return (
      <div className="selections">
        <div className="filterLabel">Search Filters</div>
        <div className="selector" onClick={this.handleClickLoc}>{this.props.location} <span className="glyphicon glyphicon-remove-circle"></span></div>
        <div className="selector" onClick={this.handleClickTitle}>{this.props.title} <span className="glyphicon glyphicon-remove-circle"></span></div>
      </div>)
    } else if (this.props.location !== '') {
      return (
      <div className="selections">
        <div className="filterLabel">Search Filters</div>
        <div className="selector" onClick={this.handleClickLoc}>{this.props.location} <span className="glyphicon glyphicon-remove-circle"></span></div> 
      </div>
      )
    } else {
      return (
      <div className="selections">
        <div className="filterLabel">Search Filters</div>
        <div className="selector" onClick={this.handleClickTitle}>{this.props.title} <span className="glyphicon glyphicon-remove-circle"></span></div>
      </div>)
    }
  }
});

module.exports = Selections;
