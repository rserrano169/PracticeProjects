Pokedex.RootView.prototype.addPokemonToList = function (pokemon) {
  this.$pokeList.append('<li class="poke-list-item" data-id="' +
    pokemon.escape('id') +
    '">Name: ' +
    pokemon.escape('name') + ', Type: ' +
    pokemon.escape('poke_type') +
    '</li>'
  );
};

Pokedex.RootView.prototype.refreshPokemon = function (callback) {
  var that = this;
  this.pokes.fetch({
    success: function(pokes) {
      pokes.each(that.addPokemonToList.bind(that));
    }
  });
};
