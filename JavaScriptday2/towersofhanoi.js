var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

'use strict';

function HanoiGame() {
  this.stacks = [[3,2,1],[],[]];
};

HanoiGame.prototype.isWon = function () {
  return this.stacks[1].length === 3 || this.stacks[2].length === 3;
};

HanoiGame.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
  var endLength =  this.stacks[endTowerIdx].length;
  var startLength = this.stacks[startTowerIdx].length;
  return (this.stacks[endTowerIdx].length === 0 && this.stacks[startTowerIdx].length > 0) ||
  this.stacks[endTowerIdx][endLength - 1] > this.stacks[startTowerIdx][startLength - 1];
};

HanoiGame.prototype.move = function (startTowerIdx, endTowerIdx) {
  var validMove = false;
  // console.log("HELLO!!!!")
  // console.log(this.isValidMove(startTowerIdx, endTowerIdx));
  if (this.isValidMove(startTowerIdx-1, endTowerIdx-1)) {
    this.stacks[endTowerIdx-1].push(this.stacks[startTowerIdx-1].pop());
    validMove = true;

  }

  return validMove;
};

HanoiGame.prototype.print = function() {
  console.log(JSON.stringify(this.stacks));
};

HanoiGame.prototype.promptMove = function (callback) {
  this.print();

  reader.question("Where would you like to move from?", function (startTowerIdx) {
    reader.question("Where would you like to move to?", function (endTowerIdx){
      callback(startTowerIdx, endTowerIdx);
    });
  });
};

HanoiGame.prototype.run = function (completionCallback) {
  var that = this;

  this.promptMove(function (startTowerIdx, endTowerIdx) {
    var isMoved = that.move(startTowerIdx, endTowerIdx);

      if (isMoved) {
        if (that.isWon()) {
            completionCallback();
        } else {
            that.run(completionCallback);
        }
      } else {
          console.log("You can't move that way! Dufus...")
          that.run(completionCallback);
      }
  });
};

var hanoiGame = new HanoiGame();

hanoiGame.run(function () {
  console.log("You did it! I'm so proud of you. :)")
  reader.close();
});
