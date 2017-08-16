function Node(value){
	this.value = value;
	this.next = null;
}

function SinglyLinkedList(){
	this.head = null;
	this.tail = null;
	this.length = 0;
}

//push - This function should add a node to the end of the SinglyLinkedList. It should return the list so that the method can be chained.

SinglyLinkedList.prototype.push = function(value){
	let node = new Node(value);

	if (!this.head && !this.tail){
		this.head = node;
		this.tail = this.head;
	} else {
		this.tail.next = node;
		this.tail = this.tail.next;
	}

	this.length++;

	return this;
}


// pop - This function should remove a node at the end of the SinglyLinkedList. It should return the node removed.

SinglyLinkedList.prototype.pop = function(){
	let element = this.tail;
	let node = this.head;

	if (this.length === 0){
		return undefined;
	}

	if (this.head === this.tail){
		this.tail.value = null;
		this.head.value = null;
		this.length--;
		return element.value;
	}

	while (node){
		if (node.next === element){
			this.tail = node;
			node.next = null;
			this.length--;
			return element.value;
		} 
		node = node.next;
	}
}

// unShift - This function should add a node to the beginning of the SinglyLinkedList. It should return the list so that the method can be chained.

SinglyLinkedList.prototype.unShift = function(value){
	let node = new Node(value);
	node.next = this.head;
	this.head = node;
	this.length++;

	return this;
}

// shift - This function should remove a node at the beginning of the SinglyLinkedList. It should return the node removed.

SinglyLinkedList.prototype.shift = function(){
	if (this.head === null) {
		return undefined;
	}

	let newHead = this.head.next;
	let element = this.head;
	element.next = null;
	this.head = newHead;
	this.length--;

	return element.value;
}

// set - This function should update the value of a node at a given index of the SinglyLinkedList. It should return true if the node is updated successfully, or false if an invalid index is passed in.

SinglyLinkedList.prototype.set = function(index, value){
	let element = this.head;
	let next = this.head.next;
	let count = 0;

	while (element){
		if (count === index){
			element.value = value;
			return true;
		} else {
			if(next === null){
				return false;
			}
			element = next;
			next = element.next;
			count++;
		}
	} 
}

// remove - This function should remove a node at a specified index in a SinglyLinkedList. It should return the removed node.

SinglyLinkedList.prototype.remove = function(index){
	let current = this.head;
	let previous = this.head;
	let count = 0;

	if (index > (this.length - 1)) {
		return 'index out of range';
	}
	if (index === 0){
		this.unShift();
	}
	if (index === (this.length - 1)){
		this.pop();
	}

	while (count < this.length) {
		if (count === index){
			let element = current;
			previous.next = current.next;
			element.next = null;
			this.length--;
			return element;
			}
		count++;
		previous = current;
		current = current.next;
	}
}

// get - This internal/helper function should find a node at a specified index in a SinglyLinkedList. It should return the found node.

SinglyLinkedList.prototype.get = function(index){
	let element = this.head;
	let next = this.head.next;
	let count = 0;

	while (element){
		if (count === index){
			return element.value;
		} else {
			if (next === null){
				return null;
			}
			element = next;
			next = element.next;
			count++;
		}
	} 
}

// insert - This internal/helper function should insert a node at a specified index in a SinglyLinkedList. It should return the new length of the SinglyLinkedList.

SinglyLinkedList.prototype.insert = function(index, value){
	let node = new Node(value);
	let current = this.head;
	let previous = this.head;
	let count = 0;

	while (count < this.length) {
		if (count === index){
			if (current === this.tail){
				previous.next = node;
				node.next = current;
				this.tail = node;
				this.length++;
				return this.length;
			} else if (current === this.head){
				node.next = current;
				this.head = node;
				this.length++;
				return this.length;
			} else {
				previous.next = node;
				node.next = current;
				this.length++;
				return this.length;
			}
		}
		count++;
		previous = current;
		current = current.next;
	}
}

// printValues - A helper function to neatly display the values in the linked list.

SinglyLinkedList.prototype.printValues = function(){
	let nodeValues = [];
	let node = this.head;

	while (node) {
		nodeValues.push(node.value);
		node = node.next;
	}

	return nodeValues;
}

// reverse - This function should reverse all of the nodes in a SinglyLinkedList. It should return the reversed SinglyLinkedList.

SinglyLinkedList.prototype.reverse = function(){
	if (this.length === 2) {
		let temp = this.head;
		this.head = this.head.next;
		temp.next = null;
		this.head.next = temp;
	}

	let tempList = [];
	let current = this.head;

	while (current){
		tempList.push(current.value);
		current = current.next;
	}

	let count = 0;

	while (tempList.length > 0){
		this.set(count, tempList.pop());
		count++;
	}

	return this.printValues();
}






