(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {

    this.game = game;
    this.$el = $el;

  };

  View.prototype.bindEvents = function () {
    that = this;

    this.$el.find("li").on("click", function (event) {
      var $targ = $(event.currentTarget);
      var pos = $targ.data("pos");

      if (!that.game.board.isEmptyPos(pos)) {
        alert("Not a valid move!")
      };

      that.game.playMove(pos);
      that.makeMove(pos);
      $targ.addClass("clicked");

      if (that.game.board.winner()) {
        that.$el.find("section").text("Congrats " + that.game.board.winner().toUpperCase() + ", you are the winner!");
      };
    });
  };

  View.prototype.makeMove = function (pos) {
    var $lists = this.$el.find("li");

    $lists.each(function (idx) {
      var $list = $lists.eq(idx);

      if ($list.data("pos") === pos) {
        var mark = that.game.board.grid[pos[0]][pos[1]];
        console.log(mark);
        $list.text(mark);
      };
    });
  };

  View.prototype.setupBoard = function () {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        var $li = $("<li></li>").data("pos", [i, j]);

        this.$el.find("ul").append($li);
      };
    };
  };

})();
