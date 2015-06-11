function Game(board, reader) {
  this.board = board;
  this.reader = reader;
  this.mark = "X";
};

Game.prototype.run = function(completionCallback) {
  var game = this;
  game.board.render();

  game.reader.question("Where row would you want to move to?", function(y) {
    game.reader.question("What column would you like to move to?", function(x){
      var xCoord = parseInt(x);
      var yCoord = parseInt(y);
      var moved = game.board.placeMark(yCoord, xCoord, game.mark);

      if (moved) {
          if (game.board.isWon(xCoord, yCoord, game.mark)) {

              game.board.render()

              completionCallback(game.mark, true);
          } else if (game.board.isDraw()) {

              game.board.render()

              completionCallback(game.mark, false)
          } else {
              game.mark === "X" ? game.mark = "O" : game.mark = "X";

              game.run(completionCallback);
          }
      } else {
          console.log("Yeah... Ya can't move there...");

          game.run(completionCallback);
      }
    });
  });
};

module.exports = Game;
