Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {

  this.$pokeDetail.empty();
  this.$pokeDetail.append('<img src="'+pokemon.escape('image_url')+'">');

  var $ul = $('<ul>')
    .addClass('detail')
    .appendTo(this.$pokeDetail);

  var attrNames = ["Name", "Poke_type", "Attack", "Defense", "Moves"];

  _.each(attrNames, function(name) {
    $('<li>')
      .html(name + ": " + pokemon.escape(name.toLowerCase()))
      .appendTo($ul);
  });
};



Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  var pokeId = $(event.currentTarget).data('id');
  var pokemon = new Pokedex.Models.Pokemon({ id: pokeId });

  pokemon.fetch({
    success: function () {
      Pokedex.rootView.renderPokemonDetail(pokemon);
    }
  });
};
