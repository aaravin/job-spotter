// var React = require('react');
// var $ = require('jquery');
// require('jquery-ui-browserify');
// var Locs = require('./../collections/locations');
// var Jobs = require('./../collections/jobs');

// var Input = React.createClass({

//   getInitialState: function() {
//     return {
//       location: '',
//       title: '',
//       locData: new Locs(),
//       titleData: new Jobs()
//     }
//   },

//   handleSubmit: function(e) {
//     e.preventDefault();
//     this.props.jobsUpdate(this.state.location, this.state.title);
//     this.setState({
//       location: '',
//       title: ''
//     });
//   },

//   searchLocation: function(e) {
//     this.setState({
//       location: e.target.value
//     });
//   },

//   searchTitle: function(e) {
//     this.setState({
//       title: e.target.value
//     });
//   },

//   componentDidMount: function() {
//     var context = this;
//     this.state.locData.fetch({
//       success: function(data) {
//         // console.log(data.models.map(function(item) { return item.get("location"); }));
//         $(React.findDOMNode(context.refs.location)).autocomplete({ 
//           source: data.models.map(function(item) { return item.get("location"); }),
//           appendTo: this,
//           create: function (e) {
//             $(this).prev('.ui-helper-hidden-accessible').remove();
//           }
//         });       
//       }
//     });
//     this.state.titleData.fetch({
//       data: {title: this.state.title + "*"},
//       success: function(data) {
//         console.log(data);
//         $(React.findDOMNode(context.refs.title)).autocomplete({ 
//           source: data.models.map(function(item) { return item.get("title"); }),
//           appendTo: this,
//           create: function (e) {
//             $(this).prev('.ui-helper-hidden-accessible').remove();
//           }
//         });       
//       }
//     });

//   },

//   render: function() {
//     return (
//       <div className="col-sm-4 col-sm-offset-3">
//         <form type="submit" onSubmit={this.handleSubmit}>
//           <input type="text" value={this.state.location} onChange={this.searchLocation} placeholder="Enter a Location" ref="location" />
//           <input type="text" value={this.state.title} onChange={this.searchTitle} placeholder="Enter a Job Title" ref="title" />
//           <button onClick={this.handleSubmit}>Search Jobs</button>
//         </form>
//       </div>
//     )
//   }

// });

// module.exports = Input;
