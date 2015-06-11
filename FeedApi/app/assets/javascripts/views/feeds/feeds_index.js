NewsReader.Views.FeedsIndex = Backbone.View.extend({

  initialize: function () {
    this.subviews = [];
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST['feeds/index'],

  render: function () {
    this.$el.empty();
    this.$el.html(this.template());
    var that = this;
    this.collection.each( function (feed) {
      var feedView = new NewsReader.Views.FeedIndexItem({ model: feed });
      that.$el.find('ul').append(feedView.render().$el);
      that.subviews.push(feedView);
    });

    return this;
  },

  remove: function () {
    _.each(this.subviews, function (subview) {
      subview.remove();
    })
    Backbone.View.prototype.remove.call(this);
  }
});
