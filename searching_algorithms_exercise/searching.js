// linearSearch - This function should accept an array and value and return the index at which the value exists or -1 if the value can not be found. Do not use indexOf to solve this! This function should use iteration not recursion.

let linearSearch = function(array, value){
	let thisIndex = -1;

	array.forEach(function(element, index){
		if (element === value) {
			thisIndex = index;
		}
	})

	return thisIndex;
}

// linearSearchRecursive - If you have not yet implemented this (it is a bonus in the recursion exercise). This function should accept an array and value and return the index at which the value exists or -1 if the value can not be found. Do not use indexOf to solve this! This function should use recursion.

function linearSearchRecursive(array, value){
	if (array.length === 0) {
		return -1;
	}
	if (array.pop() === value) {
		return array.length;
	} else {
		return linearSearchRecursive(array, value)
	}
}

// binarySearch - This function should accept an array and value and return the index at which the value exists or -1 if the value can not be found. Do not use indexOf to solve this! This function should use iteration not recursion. Make sure that your algorithm runs in O(log(n)) and not O(n).

function binarySearch(array, value){
	let minIndex = 0;
	let maxIndex = array.length - 1;
	let currentIndex;
	let currentElement;
 
	while (minIndex <= maxIndex) {
		currentIndex = (minIndex + maxIndex) / 2 | 0;
		currentElement = array[currentIndex];
 
		if (currentElement < value) {
			minIndex = currentIndex + 1;
		}
		else if (currentElement > value) {
			maxIndex = currentIndex - 1;
		}
		else {
			return currentIndex;
		}
	}
	return -1;
}


// binarySearchRecursive - If you have not yet implemented this (it is a bonus in the recursion exercise). This function should accept an array and value and return the index at which the value exists or -1 if the value can not be found. Do not use indexOf to solve this! This function should use recursion. Make sure that your algorithm runs in O(log(n)) and not O(n).

function binarySearchRecursive(array, value){
	let upperBound = array.length
	let midPoint = Math.round(upperBound / 2);
	let lowerBound = 0;

	function searchIt(){
		if (upperBound - lowerBound <= 1 && array[midPoint] !== value) {
			return -1;
		}

		if (array[midPoint] === value) {
			return midPoint;
		} else if (array[midPoint] < value) {
			lowerBound = midPoint;
			midPoint += Math.round((upperBound - lowerBound) / 2);
			return searchIt();
		} else if (array[midPoint] > value) {
			upperBound = midPoint;
			midPoint -= Math.round((upperBound - lowerBound) / 2);
			return searchIt();
		}
	}

	return searchIt();
}



















