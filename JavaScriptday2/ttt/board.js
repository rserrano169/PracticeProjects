function Board() {
  this.board = [[" ", " ", " "],
                [" ", " ", " "],
                [" ", " ", " "]];

  this.winner = null;
};

Board.prototype.isValid = function (x, y) {
  return y < 3 && x < 3 && this.isEmpty(x ,y);
}

Board.prototype.isEmpty = function (x, y) {
  return this.board[x][y] === " ";
};

Board.prototype.render = function(){
  console.log("\n")
  
  this.board.forEach(function(el) {
    console.log(JSON.stringify(el) + "\n");
  });
}

Board.prototype.placeMark = function (x, y, mark) {
  var marked = false;

  if (this.isValid(x, y)) {
    this.board[x][y] = mark;

    marked = true;
  }

  return marked;
};

Board.prototype.wonHorizontally = function (y , mark) {
  var won = true;

  this.board[y].forEach(function (el) {
    if (el !== mark) {
      won = false;
    }
  });

  return won;
};

Board.prototype.wonVertically = function (x, mark) {
  var won = true;

  this.board.forEach(function (el) {
    if (el[x] !== mark) {
      won = false;
    }
  });

  return won;
};


Board.prototype.wonDiagonally = function(x, y, mark) {
  if (x === 1) {
      return (this.board[y - 1][x + 1] === mark && this.board[y + 1][x - 1] === mark) ||
             (this.board[y + 1][x + 1] === mark && this.board[y - 1][x - 1] === mark);
  } else{
      return this.board[1][1] === mark &&
             (this.board[0][0] === mark && this.board[2][2] === mark ||
             this.board[0][2] === mark && this.board[2][0] === mark);
  }
};

Board.prototype.isDraw = function () {
  var draw = true;

  this.board.forEach(function (el) {
    el.forEach(function (el2) {
      if (el2 === " ") {
        draw = false
      }
    });
  });

  return draw;
};

Board.prototype.gameOver = function (x, y, mark) {
  return this.isDraw() || this.isWon(x , y, mark);
};

Board.prototype.isWon = function (x, y, mark) {
  if (this.wonVertically(x, mark)) {
      this.winner = mark;

      return true;
  } else if (this.wonHorizontally(y, mark)) {
      this.winner = mark;

      return true;
  } else if (Math.abs(x - y) === 0 || Math.abs(x - y) === 2) {
      this.winner = mark;

      return this.wonDiagonally(x, y, mark);
  } else {
      return false;
  }
};

module.exports = Board;
