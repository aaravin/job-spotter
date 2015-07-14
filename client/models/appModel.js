var AppModel = Backbone.Model.extend({
  initialize: function() {
    this.set("jobs", new Jobs(jobData));
  }
});
