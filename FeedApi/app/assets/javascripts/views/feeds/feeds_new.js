NewsReader.Views.FeedsNew = Backbone.View.extend({

  template: JST["feeds/new"],

  events: {
    "submit form": "createFeed"
  },

  render: function () {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    return this;
  },

  createFeed: function () {
    var that = this;
    event.preventDefault();

    var attrs = $(event.target).serializeJSON()['feed'];

    this.model.save(attrs, {
      success: function(){
        Backbone.history.navigate('#', {trigger: true});
      },
      error: function(model, response){
        that.$el.prepend("Error: Invalid URL");
      }
    })

  }
});
