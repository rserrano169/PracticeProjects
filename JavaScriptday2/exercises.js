// Function.prototype.myBind = function (context) {
//   var fn = this;
//
//   return function() {
//     fn.apply(context)
//   };
// };

/////////////////////////////////////////////////////

function Clock () {
}

Clock.TICK = 5000;

Clock.prototype.run = function () {
  // 1. Set the currentTime.
  this.currentTime = new Date();
  // 2. Call printTime.
  this.printTime();
  // 3. Schedule the tick interval.
  setInterval(this._tick.bind(this), 5000);
};

Clock.prototype._tick = function () {
  // 1. Increment the currentTime.
  var parsedDate = Date.parse(this.currentTime);
  this.currentTime = new Date(parsedDate + Clock.TICK);
  // 2. Call printTime.
  this.printTime();

};

Clock.prototype.printTime = function (increment) {
  // Format the time in HH:MM:SS
  var hours = this.currentTime.getHours();
  var minutes = this.currentTime.getMinutes();
  var seconds = this.currentTime.getSeconds();

  console.log(hours + ":" + minutes + ":" + seconds);
};

var clock = new Clock();
clock.run();
