NewsReader.Views.FeedShow = Backbone.View.extend({

  template: JST['feeds/show'],

  events: {
    "click button": "refresh"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    return this;
  },

  refresh: function () {
    this.model.fetch();
  }
});
