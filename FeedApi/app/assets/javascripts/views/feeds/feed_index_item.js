NewsReader.Views.FeedIndexItem = Backbone.View.extend({
  tagName: 'li',
  template: JST["feeds/index_item"],

  initialize: function () {
    this.listenTo(this.model, "destroy", this.remove);
  },

  events: {
    "click button": "removeFeed"
  },

  render: function () {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    return this;
  },

  removeFeed: function () {
    this.model.destroy();
  }
});
