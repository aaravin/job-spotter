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
    if (this.props.location === '' && this.props.title === '') {
      return (
        <div className="selections">
          <div className="filterLabel">Search Filters</div>
        </div>)
    } else if (this.props.location !== '' && this.props.title !== '') {
      return (
      <div className="selections">
        <div className="filterLabel">Search Filters</div>
        <div className="selector" onClick={this.handleClickLoc}>{this.props.location}</div>
        <div className="selector" onClick={this.handleClickTitle}>{this.props.title}</div>
      </div>)
    } else if (this.props.location !== '') {
      return (
      <div className="selections">
        <div className="filterLabel">Search Filters</div>
        <div className="selector" onClick={this.handleClickLoc}>{this.props.location}</div> 
      </div>
      )
    } else {
      return (
      <div className="selections">
        <div className="filterLabel">Search Filters</div>
        <div className="selector" onClick={this.handleClickTitle}>{this.props.title}</div>
      </div>)
    }
  }
});

module.exports = Selections;
