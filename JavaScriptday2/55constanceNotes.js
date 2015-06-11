3 ways to define a function
==================================
1. var func = function () {}
2. function func() {}
3. function () {}
3b. (function () {})()



3 ways to call a function
===================================
1) function style //=> this === window
2) method style //=> this === obj on which func is called
3) constructor style //=> this === new blank obj {}

jk there are more:
// these INVOKE the function
4) apply //=> this === whatever we pass to it
5) call //=> this === whatever we pass to it


var cat = {
  name: "Sennacy",
  sayHi: function () {
    return "meow my name is " + this.name;
  },
  addTwoNums: function (num1, num2) {
    return this.name + " says this is the sum: " + (num1 + num2);
  }
};

var dog = {
  name: "Skin Folds"
};

cat.sayHi(); //=> "meow my name is Sennacy"

var crazySayHi = cat.sayHi;
crazySayHi(); //=> "meow my name is "

crazySayHi.call(cat); //=> "meow my name is Sennacy"
// sets this === cat
crazySayHi.apply(cat); //=> same
cat.sayHi.apply(cat); //=> also same

cat.sayHi.apply(dog); //=> "meow my name is Skin Folds"

cat.addTwoNums(2, 4); //=> "Sennacy ... 6"
cat.addTwoNums.call(cat, 2, 4) //=> same
cat.addTwoNums.apply(cat, [2, 4]) //=> same

// FIRST ARGUMENT ALWAYS === THIS



6) bind //=> RETURNS a new function with `this` set to what you want
// this DOES NOT INVOKE the function
var numFunk = cat.addTwoNums;
numFunk(); // this === window

var numFunkFixed = cat.addTwoNums.bind(cat); //=> DOES NOT CALL THE FUNCTION
numFunkFixed(); //=> "Sennacy ... "

var dogAdd = cat.addTwoNums.bind(dog);
dogAdd(); //=> "Skin Folds ... "


cat.addTwoNums.call(dog, 2, 4);
cat.addTwoNums.bind(dog)(2, 4);




function Cat(name, age) {
  var randIndex = Math.floor(Math.random() * Cat.COLORS.length);
  this.name = name;
  this.age = age;
  this.color = Cat.COLORS[randIndex];
};

Cat.COLORS = ["brown", "orange", "black"];

Cat.makeThreeCats = function () {
  var cats = [];

  for (var i = 0; i < 3; i++) {
    cats.push(new Cat(i, i));
  }

  return cats;
};

Cat.prototype.sayHi = function () {
  return "meow " + this.name;
};


var times = function (num, callback) {
  for (var i = 0; i < num; i++) {
    callback(i);
  }
};


var sennacy = new Cat("sennacy", 7);
times(5, sennacy.sayHi); //=> NO!
times(5, sennacy.sayHi()); //=> EVEN WORSE!

// solutions:
times(5, function () {
  sennacy.sayHi();
}); //=> ok

var sayHi = function () {
  sennacy.sayHi();
}; //=> not invoked

times(5, sayHi); //=> also good

times(5, sennacy.sayHi.bind(sennacy)); //=> :)



setTimeout(sennacy.sayHi.bind(sennacy), 5000);
