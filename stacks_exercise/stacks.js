function Node(value){
	this.value = value;
	this.next = null;
	this.previous = null;
}

function Stack(){
	this.first = null;
	this.last = null;
	this.size = 0;
}

// push - This function adds the value to the beginning of the stack. This should be an O(1) operation and return the size of the stack.

Stack.prototype.push = function(value){
	let node = new Node(value);

	if (!this.first && !this.last){
		this.first = node;
		this.last = this.first;
	} else {
		node.previous = this.first;
		this.first.next = node;
		this.first = this.first.next;
	}

	this.size++;
	return this.size;
}

// pop - This function removes the value at the beginning of the stack. This should be an O(1) operation and return the value removed.

Stack.prototype.pop = function(){
	if (this.first === null){
		return undefined;
	}

	if (this.size === 1){
		let value = this.first.value;
		this.first = null;
		this.last = null;
		this.size--;
		return value;
	}

	let node = this.first;
	let previous = this.first.previous;

	previous.next = null;
	node.previous = null;
	this.first = previous;
	this.size--;

	return node.value;
}

// print - This function console.log's all the values in the stack.

Stack.prototype.print = function(){
	let nodeValues = [];
	let node = this.first;

	while (node) {
		nodeValues.push(node.value);
		node = node.next;
	}

	console.log(nodeValues);
}

// peek - this function returns the value at the top of the stack

Stack.prototype.peek = function(){
	let element = this.first;

	return element.value;
}

let myStack = new Stack();

myStack.push(5);
myStack.push(10);
myStack.print()
console.log(myStack);







