// Write a function called productOfArray which takes in an array of numbers and returns the product of them all

let productOfArray = function(arr){
	if (arr.length === 0){
		return 1;
	}
	let arrCopy = arr.slice();
	let thisNum = arrCopy.pop();
	return thisNum * productOfArray(arrCopy);
}

// Write a function called contains that searches for a value in a nested object. It returns true if the object contains that value.

let contains = function(obj, val){
	if (typeof obj !== 'object') {
		return false;
	}

	for (let key in obj) {
		if (obj[key] === val) {
			return true;
		} else {
			return contains(obj[key], val);
		}
	}
}

var nestedObject = {
    data: {
        info: {
            stuff: {
                thing: {
                    moreStuff: {
                        magicNumber: 44
                    }
                }
            }
        }
    }
}

// write a function called colletStrings that returns all of the strings in a nested object.

function collectStrings(object){
	let valuesArray = [];

	function collectStringsHelper(object){
		let objectkeys = Object.keys(object);
		objectkeys.forEach(function(key){
			if (typeof object[key] === 'string'){
				valuesArray.push(object[key]);
			} else if (typeof object[key] === 'object') {
				return collectStringsHelper(object[key]);
			}
		})
	}

	collectStringsHelper(object);

	return valuesArray;
}

// Given a multi-dimensional integer array, return the total number of integers, stored inside this array. You should not rely on the number of dimensions to solve this kata. If n is the number of dimensions, then: 1 <= n < +Infinity.

function realSize(arrays, newArr) {
  // Force be with you, code warrior!
  if (!newArr) {
  	newArr = [];
  }

  for (let i = 0; i < arrays.length; i++) {
  	if (arrays[i].constructor === Array) {
  		newArr.concat(realSize(arrays[i], newArr));
  	} else {
  		newArr.push(arrays[i]);
  	}
  }

  return newArr.length;
}

// Write a function that sums squares of numbers in list that may contain more lists

// function SumSquares(l){
//     let flatArray = flatten(l);
//     let sum = 0;
//     flatArray.forEach(function(element){
//     	sum += element * element;
//     });

//     return sum;
// }

// function flatten(arrays, newArr) {
//   if (!newArr) {
//   	newArr = [];
//   }

//   for (let i = 0; i < arrays.length; i++) {
//   	if (arrays[i].constructor === Array) {
//   		newArr.concat(flatten(arrays[i], newArr));
//   	} else {
//   		newArr.push(arrays[i]);
//   	}
//   }

//   return newArr;
// }

function SumSquares(arr){
    let sum = 0;
    
    for (let i = 0; i < arr.length; i++) {
    	if (Array.isArray(arr[i])){
    		sum += SumSquares(arr[i]);
    	} else {
    		sum += arr[i] * arr[i];
    	}
    }

    return sum;  
}

// You need to design a recursive function called replicate which will receive arguments times and number.

// The function should return an array containing repetitions of the number argument. For instance, replicate(3, 5) should return [5,5,5]. If the times argument is negative, return an empty array.

// As tempting as it may seem, do not use loops to solve this problem.

function replicate(times, number) {

	if (times < 1) {
		return [];
	} else {
		return [number].concat(replicate(times - 1, number))
	}

};

// another possible solution similar to something I tried but couldn't get working
function replicate(times, number) {
  var arr = [];
  
  if (times < 0){
    return arr;
  }
  
  function replicateHelper(times){
    if (times === 0) return;
    arr.push(number);
    return replicateHelper(times-1);
  }
  
  replicateHelper(times);
  
  return arr;
}

// Write a function called search that finds a value in an array and returns the index where the value is at. If the value is not found, the function should return negative 1.

function search(array, value){
	if (array.length === 0) {
		return -1;
	}
	if (array.pop() === value) {
		return array.length;
	} else {
		return search(array, value)
	}
}

// Refactor your search function to use a faster algorithm called binary search 

function binarySearch(array, value){
	let sortedArray = array.sort(function(a, b){
		return a - b;
	});

	let upperBound = sortedArray.length
	let midPoint = Math.round(upperBound / 2);
	let lowerBound = 0;

	function searchIt(){
		if (upperBound - lowerBound <= 1 && sortedArray[midPoint] !== value) {
			return -1;
		}

		if (sortedArray[midPoint] === value) {
			return midPoint;
		} else if (sortedArray[midPoint] < value) {
			lowerBound = midPoint;
			midPoint += Math.round((upperBound - lowerBound) / 2);
			return searchIt();
		} else if (sortedArray[midPoint] > value) {
			upperBound = midPoint;
			midPoint -= Math.round((upperBound - lowerBound) / 2);
			return searchIt();
		}
	}

	return searchIt();
}

// Write a function called stringifyNumbers which takes in an object and finds all of the values which are numbers and converts them to strings. Recursion would be a great way to solve this!

function stringifyNumbers(obj){
	let newObj = Object.assign({}, obj);

	function stringifyNumbersHelper(newObj){
		let objKeys = Object.keys(newObj);

		objKeys.forEach(function(key){
			if (typeof newObj[key] === 'number') {
				newObj[key] = newObj[key].toString();
			} else if (typeof newObj[key] === 'object') {
				return stringifyNumbersHelper(newObj[key]);
			}
		})
	}

	stringifyNumbersHelper(newObj);

	return newObj;
}

var obj = {
    num: 1,
    test: [],
    data: {
        val: 4,
        info: {
            isRight: true,
            random: 66
        }
    }
}

console.log(stringifyNumbers(obj));

/*/
{
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
/*/


//In JavaScript there is a concept of function and variable "hoisting". (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting)

// Due to this compilation strategy JavaScript retains the ability to do mutual recursion. This means you can have all the fun of regular recursion (where a function calls itself until a terminating condition) and apply it to multiple functions calling each other!

// Let's use the Hofstadter Female and Male sequences to demonstrate this technique. You'll want to create two functions F and M such that the following equations are true:

// F(0) = 1
// M(0) = 0
// F(n) = n - M(F(n - 1))
// M(n) = n - F(M(n - 1))

function F(n) { 
	return n === 0 ? 1 : n - M(F(n - 1));
}

function M(n) { 
	return n === 0 ? 0 : n - F(M(n - 1));
}

function runSequence(n) {
	let fString = [];
	let mString = [];

	for (let i = 0; i < n; i ++) {
		fString.push(F(i));
		mString.push(M(i));
	}

	console.log('F: ' + fString.join(','));
	console.log('M: ' + mString.join(','));
}

// /* This version memoizes results so they're just computed once. */
function S(gender, n) {
  var index = 2 * n + gender;
  if (!(index in S))
    S[index] = n ? n - S(!gender, S(gender, n - 1)) : gender;
  return S[index];
}

function F(n) { return S(1, n); }
function M(n) { return S(0, n); }






