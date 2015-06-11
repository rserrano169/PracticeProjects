NewsReader.Routers.Feeds = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "index",
    "feeds/new": "createFeed",
    "feeds/:id": "feedShow"

  },

  index: function () {
    NewsReader.feeds.fetch();
    var indexView = new NewsReader.Views.FeedsIndex({ collection: NewsReader.feeds });

    this._swapView(indexView);
  },

  feedShow: function(id) {
    var feed = NewsReader.feeds.getOrFetch(id);
    var feedView = new NewsReader.Views.FeedShow({ model: feed });
    this._swapView(feedView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  },

  createFeed: function () {
    var feed = new NewsReader.Models.Feed();
    var createView = new NewsReader.Views.FeedsNew({ model: feed });
    this._swapView(createView);
  }
});
