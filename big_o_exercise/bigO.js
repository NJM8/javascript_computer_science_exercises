// Big O notation is a theoretical way of comparing one algorithm to another. It looks at the inputs and opertations to determine how complex an algorithm is. Typically small components and constants are ignored as they will have little affect on the runtime or space used.

// O(1) is a constant time algorithm. Meaning that no matter what the input is it will always take the same amount of time.

var addThings = function(a, b, c){
	return a + b + c;
}

// addThings will always take the same amount of time as it is performing the same number of operations no matter what the input.

// O(n) is linear time because all of the inputs are operated on roughly one time.

var sayHello = function(numberOfTimes){
	for (var i = 0; i < numberOfTimes; i++){
		console.log("Hello!");
	}
}

// sayHello is linear because if numberOfTimes is 1000 it will take ten times longer than if it is 100. The runtime is directly proportional to the input.

// O(n*n) is typical of a loop nested within a loop. You are iterating over the data set once for each number in the data set.

function bubbleSort(arr) {
  var len = arr.length;
  var lastSwap;
  var temp
  while (len != 0) {
    lastSwap = 0;
    for (var i = 1; i < len; i++) {
      if (arr[i - 1] > arr[i]) {
        // Swap the two elements
        temp = arr[i-1];
        arr[i-1] = arr[i];
        arr[i] = temp;
        lastSwap = i;
      }
    }
    len = lastSwap;
  }
}


// Simplify the following big O expressions as much as possible:

// O(n + 10) = O(n)
// O(100 * n) = O(n)
// O(25) = O(1)
// O(n^2 + n^3) = O(??)
// O(n + n + n + n) = O(n)
// O(1000 * log(n) + n) = O(log(n))
// O(1000 * n * log(n) + n) = O(n(log(n)))
// O(2^n + n^2) = O(??)
// O(5 + 3 + 1) = O(1)
// O(n + n^(1/2) + n^2 + n * log(n)^10) = O(??)


// Determine the time and space complexities for each of the following functions. If you're not sure what these functions do, copy and paste them into the console and experiment with different inputs!

// 1.

function logUpTo(n) {
    for (var i = 1; i <= n; i++) {
        console.log(i);
    }
}
// space = O(n)
// time = O(n)

// 2. 

function logAtMost10(n) {
    for (var i = 1; i <= Math.min(n, 10); i++) {
        console.log(i);
    }
}
// space = O(10)
// time = O(n)

// 3. 

function logAtLeast10(n) {
    for (var i = 1; i <= Math.max(n, 10); i++) {
        console.log(i);
    }
}
// space = O(n)
// time = O(n)

// 4.

function onlyElementsAtEvenIndex(array) {
    var newArray = Array(Math.ceil(array.length / 2));
    for (var i = 0; i < array.length; i++) {
        if (i % 2 === 0) {
            newArray[i / 2] = array[i];
        }
    }
    return newArray;
}
// space = O(n/2)
// time = O(n)

// 5. 

function subtotals(array) {
    var subtotalArray = Array(array.length);
    for (var i = 0; i < array.length; i++) {
        var subtotal = 0;
        for (var j = 0; j <= i; j++) {
            subtotal += array[j];
        }
        subtotalArray[i] = subtotal;
    }
    return subtotalArray;
}
// space = O(n)
// time = O(n*n)

















