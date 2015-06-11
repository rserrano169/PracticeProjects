var Index = require ("./ttt/index")

var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var board = new Index.Board();

var game = new Index.Game(board, reader);

game.run(function(mark, didWin){
  if (didWin) {
      console.log("Congratulations, " + mark + ", you win!");
  } else {
      console.log("It's a draw!");
  }

  reader.close()
})
