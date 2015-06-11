var readline = require('readline');
reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var addNumbers = function(sum, numsLeft, completionCallback) {
  if (numsLeft == 0) {
    completionCallback(sum);
  }

  if(numsLeft > 0) {
    reader.question("What number?", function(number){
      sum += parseInt(number);
      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  }
};

addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});
