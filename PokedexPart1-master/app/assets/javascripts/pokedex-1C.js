Pokedex.RootView.prototype.createPokemon = function (attrs, callback) {

  var that = this;

  var newPoke = new Pokedex.Models.Pokemon(attrs);
  console.log("here");

  newPoke.save({}, {
    success: function () {
      that.pokes.add(newPoke);

      that.addPokemonToList(newPoke);
      callback(newPoke);
    },
    error: function () {
      console.log("error");
    }
  });
};

Pokedex.RootView.prototype.submitPokemonForm = function (event) {
  event.preventDefault();

  var attributes = $(event.currentTarget).serializeJSON().pokemon;

  this.createPokemon(attributes, this.renderPokemonDetail.bind(this));
};
