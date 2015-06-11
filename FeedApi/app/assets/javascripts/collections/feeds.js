NewsReader.Collections.Feeds = Backbone.Collection.extend({

  model: NewsReader.Models.Feed,

  url: 'api/feeds',

  getOrFetch: function(id){
    var that = this;
    if (this.get(id)){
      var model = this.get(id);
      model.fetch();
    } else {
      var model = new NewsReader.Models.Feed({id: id});
      model.fetch({
        success: function() { that.add(model); }
      })
    }
    return model;
  }

});
