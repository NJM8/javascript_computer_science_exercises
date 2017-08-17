function MaxBinaryHeap(){
	this.values = [];
}

//insert - Implement the insert function on the MaxBinaryHeap.prototype: This function should insert a node in a binary heap. Make sure to re-order the heap after insertion if necessary

MaxBinaryHeap.prototype.insert = function(value){
	this.values.push(value);
	if (this.values.length === 1) {
		return this.values;
	}
	this.sortUp(this.values.length - 1, value);
	return this.values;
}

MaxBinaryHeap.prototype.sortUp = function(childLocation, childData){
	if (childLocation > 0) { 
		let parentLocation = Math.floor((childLocation - 1) / 2);
		let parentData = this.values[parentLocation];

		if (childData > parentData) {
			this.values[parentLocation] = childData;
			this.values[childLocation] = parentData;
			this.sortUp(parentLocation, childData);
		} else {
			return;
		}
	} else {
		return;
	}
}

//Given an array of numbers, implement a function called maxHeapify which converts an array of numbers into a max-heap

let maxHeapify = function(array){
	let newArray = new MaxBinaryHeap();

	for (let i = 0; i < array.length; i++) {
		newArray.insert(array[i]);
	}

	console.log(newArray);
	console.log(checkMaxHeap(0, newArray.values));

	return newArray.values;
}

//remove - Implement the remove function on the MaxBinaryHeap.prototype This function should remove the root node in a binary heap. Make sure to re-order the heap after removal if necessary

MaxBinaryHeap.prototype.remove = function(){
	let head = this.values[0];
	let tail = this.values.pop();
	this.values[0] = tail;
	this.sortDown(0, tail);

	return head;
}

MaxBinaryHeap.prototype.sortDown = function(parentLocation, parentData){
	if (parentLocation < this.values.length) {
		let targetLocation = parentLocation;
		let targetData = parentData;
		let leftChildLocation = Math.floor(2 * targetLocation + 1);
		let rightChildLocation = Math.floor(2 * targetLocation + 2);
		let leftChildData = false;
		let rightChildData = false;

		if (leftChildLocation < this.values.length) {
			leftChildData = this.values[leftChildLocation];
		}

		if (rightChildLocation < this.values.length) {
			rightChildData = this.values[rightChildLocation];
		}

		if (leftChildData && rightChildData) {
			if (leftChildData > rightChildData) {
				targetLocation = leftChildLocation;
				targetData = leftChildData;
			} else {
				targetLocation = rightChildLocation;
				targetData = rightChildData;
			}
		} else if (leftChildData && !rightChildData) {
			if (leftChildData > parentData) {
				targetLocation = leftChildLocation;
				targetData = leftChildData;
			}
		} else if (rightChildData && !leftChildData) {
			if (rightChildData > parentData) {
				targetLocation = rightChildLocation;
				targetData = rightChildData;
			}
		}

		if (targetLocation !== parentLocation) {
			this.values[parentLocation] = targetData;
			this.values[targetLocation] = parentData;
			this.sortDown(targetLocation, parentData);
		}
	}
}

// Implement a function called checkMaxHeap. It should check if an array is a valid Max Heap and return true or false.

let checkMaxHeap = function(array){
	let parentLocation = 0;
	let isMaxheap = true;

	let checkMaxHeapHelper = function(parentLocation, array){
		let parentData = array[parentLocation];
		let leftChildLocation = Math.floor(2 * parentLocation + 1);
		let rightChildLocation = Math.floor(2 * parentLocation + 2);
		let leftChildData = null;
		let rightChildData = null;

		if (leftChildLocation < array.length) {
			leftChildData = array[leftChildLocation];
			if (parentData < leftChildData) {
				isMaxheap = false;
				return;
			} else {
				return checkMaxHeapHelper(leftChildLocation, array);
			}
		}

		if (rightChildLocation < array.length) {
			rightChildData = array[rightChildLocation];
			if (parentData < rightChildData) {
				isMaxheap = false;
				return;
			} else {
				return checkMaxHeapHelper(rightChildLocation, array);
			}
		}
	}

	checkMaxHeapHelper(parentLocation, array);
	return isMaxheap;		
}











