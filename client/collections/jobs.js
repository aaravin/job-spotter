var Jobs = Backbone.Collection.extend({
  model: JobModel,

  url: 'http://localhost:8080/api/jobs',

  initialize: function() {
  
  }
  
});
