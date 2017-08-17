function Node(value){
	this.value = value;
	this.next = null;
	this.previous = null;
}

function Queue(){
	this.first = null;
	this.last = null;
	this.size = 0;
}

// enqueue - this function adds the value to the end of the queue. This should be an O(1) operation and return the size of the queue.

Queue.prototype.enqueue = function(value){
	let node = new Node(value);

	if (this.size === 0){
		this.first = node;
		this.last = node;
		this.size++;

		return this.size;
	} else {
		node.previous = this.last;
		this.last.next = node;
		this.last = node;
		this.size++;

		return this.size;
	}
}

// dequeue - this function returns the value at the beginning of the queue. It should be an O(1) operation and should return the value removed.

Queue.prototype.dequeue = function(){
	let value = this.first.value;

	this.first = this.first.next;
	
	if (this.size > 1){
		this.first.previous = null;
	}

	this.size--;

	return value;
}

// peek - this function returns the first value in the Queue.

Queue.prototype.peek = function(){
	let value = this.first.value;
	return value;
}

// print - this function prints all of the values in the Queue to the console.

Queue.prototype.print = function(){
	let nodeValues = [];
	let node = this.first;

	while (node) {
		nodeValues.push(node.value);
		node = node.next;
	}

	console.log(nodeValues);
}

















