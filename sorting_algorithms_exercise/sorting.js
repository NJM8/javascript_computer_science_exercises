// Implement bubble sort. Your function should accept an array and return an array of sorted values.

function bubbleSort(arr){
	let numElements = arr.length;

	for (let i = 0; i < numElements; i++) {
		for (let j = 0; j < (numElements - i - 1); j++) {
			if (arr[j] > arr[j + 1]){
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			} 
		}
	}

	return arr;
}

// insertion sort - Implement insertion sort. Your function should accept an array and return an array of sorted values.

function insertionSort(arr){
	let numElements = arr.length;

	for (let i = 1; i < numElements; i++) {
		if (arr[i] < arr[i - 1]) {
			let temp = arr[i];
			for (let j = i - 1; j > -1; j--) {
				arr[j + 1] = arr[j];
				arr[j] = temp; 
				if (arr[j - 1] < arr[j]){
					break;
				}
			}
		}
	}

	return arr;
}

// selection sort - Implement selection sort. Your function should accept an array and return an array of sorted values.

function selectionSort(arr){
	let numElements = arr.length;

	function walkThroughArray(num){
		let smallestElement = arr[num];
		let smallestElementLocation = 0;
		for (let i = num; i < numElements; i++) {
			if (arr[i] < smallestElement) {
				smallestElement = arr[i];
				smallestElementLocation = i;
			}
		}
		if (arr[num] == smallestElement) {
			return;
		}
		let temp = arr[num];
		arr[num] = smallestElement;
		arr[smallestElementLocation] = temp;
	}

	for (let j = 0; j < numElements; j++) {
		walkThroughArray(j);
	}

	return arr;
}

// merge sort - Implement merge sort. Your function should accept an array and return an array of sorted values. You can solve this iteratively or recursively.

function mergeSort(arr){
	if (arr.length < 2) {
		return arr;
	}

	let arr1 = arr.slice(0, arr.length / 2);
	let arr2 = arr.slice(arr.length / 2, arr.length);

	return mergeSortHelper(mergeSort(arr1), mergeSort(arr2));
}

function mergeSortHelper(left, right){
	let newArr = [];
	let leftCount = 0;
	let rightCount = 0;

	while (leftCount < left.length && rightCount < right.length) {
		if (left[leftCount] < right[rightCount]) {
			newArr.push(left[leftCount++]);
		} else {
			newArr.push(right[rightCount++]);
		}
	}

	return newArr.concat(left.slice(leftCount)).concat(right.slice(rightCount));
}

// merge - It should merge two sorted arrays into one array.

function merge(arrayOne, arrayTwo){
	let newArr = arrayOne.concat(arrayTwo);

	return mergeSort(newArr);
}

// quick sort - Implement quick sort. Your function should accept an array and return an array of sorted values. You can solve this iteratively or recursively.

function quickSort(arr){
	if (arr.length <= 1) {
		return arr;
	}

	let pivot = arr[0];

	let left = [];
	let right = [];

	for (let i = 1; i < arr.length; i++) {
		arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
	}

	return quickSort(left).concat(pivot, quickSort(right));
}

// pivot - it mutates an array so that if the first element is the pivot, all elements less than that number are on the left of it. pivot should return the final position of the pivot element. 

function pivot(arr){
	let pivot = arr[0];

	let left = [];
	let right = [];

	for (let i = 1; i < arr.length; i++) { 
		arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
	}

	for (let i = 0; i < left.length; i++) {
		arr[i] = left[i];
	}

	arr[left.length] = pivot;

	for (let i = 0; i < right.length; i++) {
		arr[left.length + 1 + i] = right[i];
	}

	return arr.indexOf(pivot);
}































