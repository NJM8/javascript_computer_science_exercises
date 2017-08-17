function Node(value){
	this.value = value;
	this.left = null;
	this.right = null;
}

function BinarySearchTree(){
	this.root = null;
}

// insertIteratively - This function should insert a node in a binary tree. This should be solved using iteration.

BinarySearchTree.prototype.insertIteratively = function(value){
	let node = new Node(value);

	if (this.root === null) {
		this.root = node;
		return this;
	}

	let found = false;
	let current = this.root;

	while (!found){
		if (current.value > node.value) {
			if (current.left === null) {
				current.left = node;
				found = true;
			} else {
				current = current.left;
				continue;
			}
		} else {
			if (current.right === null) {
				current.right = node;
				found = true;
			} else {
				current = current.right;
				continue;
			}
		}
	}

	return this;
}

// insertRecursively - This function should insert a node in a binary tree. This should be solved using recursion.

BinarySearchTree.prototype.insertRecursively = function(value){
	let node = new Node(value);

	if (this.root === null) {
		this.root = node;
		return this;
	} 

	let current = this.root;

	let insertRecursivelyHelper = function(current){
	    if (current.value > node.value) {
			if (current.left === null) {
				current.left = node;
				return this;
			} else {
				current = current.left;
				insertRecursivelyHelper(current);
			}
		} else {
			if (current.right === null) {
				current.right = node;
				return this;
			} else {
				current = current.right;
				insertRecursivelyHelper(current);
			}
		}
	}

	insertRecursivelyHelper(current);
	return this;
}

// findIteratively - This function should find a node in a binary tree. It should return the node if found, otherwise return undefined. This should be solved using iteration. The tests for this method assume that insertIteratively has been implemented correctly.

BinarySearchTree.prototype.findIteratively = function(value){
	if (this.root === null) {
		return undefined;
	}

	if (this.root.value === value) {
		return this.root;
	}

	let current = this.root;

	while (current){
		if (current.right === null && current.left === null) {
			return undefined;
		}

		if (current.left !== null) {
			if (current.left.value === value) {
				current = current.left;
				return current;
			}
		}

		if (current.right !== null) {
			if (current.right.value === value) {
				current = current.right;
				return current;
			}
		}

		if (current.value > value) {
			current = current.left;
		} else {
			current = current.right;
		}	
	}
}

// findRecursively - This function should find a node in a binary tree. It should return the node if found, otherwise return undefined. This should be solved using recursion. The tests for this method assume that insertIteratively has been implemented correctly.

BinarySearchTree.prototype.findRecursively = function(value){
	if (this.root === null) {
		return undefined;
	}

	if (this.root.value === value) {
		return this.root;
	}

	let current = this.root;

	let findRecursivelyHelper = function(current){
		if (current.right === null && current.left === null) {
			current = undefined;
			return;
		}

		if (current.left !== null) {
			if (current.left.value === value){
				current = current.left;
				return current;
			}
		}

		if (current.right !== null) {
			if (current.right.value === value){
				current = current.right
				return current;
			}
		}

		if (current.value > value) {
			current = current.left;
			findRecursivelyHelper(current);
		} else {
			current = current.right;
			findRecursivelyHelper(current);
		}
	}

	return findRecursivelyHelper(current);
}

// toArray - This function should convert a binary search tree into an array of nodes from smallest to largest. The tests for this method assume that insertIteratively has been implemented correctly.

BinarySearchTree.prototype.toArray = function(){
	if (this.root === null){
		return undefined;
	}
	
	let array = [];
	let current = this.root;

	let toArrayHelper = function(current){
		if (current.left !== null) {
			toArrayHelper(current.left);
		}

		array.push(current.value);

		if (current.right !== null) {
			toArrayHelper(current.right);
		}
	}

	toArrayHelper(current);

	return array;
}

// DFSPreOrder - This function should search through each node in the binary search tree using pre-order depth first search and return an array containing each node's value.

BinarySearchTree.prototype.DFSPreOrder = function(){
	if (this.root === null){
		return undefined;
	}
	
	let array = [];
	let current = this.root;

	let DFSPreOrderHelper = function(current){
		array.push(current.value);

		if (current.left !== null) {
			DFSPreOrderHelper(current.left);
		}

		if (current.right !== null) {
			DFSPreOrderHelper(current.right);
		}
	}

	DFSPreOrderHelper(current);

	return array;
}

// DFSInOrder - This function should search through each node in the binary search tree using in-order depth first search and return an array containing each node's value.

BinarySearchTree.prototype.DFSInOrder = function(){
	if (this.root === null){
		return undefined;
	}
	
	let array = [];
	let current = this.root;

	let DFSInOrderHelper = function(current){
		if (current.left !== null) {
			DFSInOrderHelper(current.left);
		}

		array.push(current.value);

		if (current.right !== null) {
			DFSInOrderHelper(current.right);
		}
	}

	DFSInOrderHelper(current);

	return array;
}

// DFSPostOrder - This function should search through each node in the binary search tree using post-order depth first search and return an array containing each node's value.

BinarySearchTree.prototype.DFSPostOrder = function(){
	if (this.root === null){
		return undefined;
	}
	
	let array = [];
	let current = this.root;

	let DFSPostOrderHelper = function(current){
		if (current.left !== null) {
			DFSPostOrderHelper(current.left);
		}

		if (current.right !== null) {
			DFSPostOrderHelper(current.right);
		}

		array.push(current.value);
	}

	DFSPostOrderHelper(current);

	return array;
}

// breadthFirstSearch - This function should search through each node in the binary search tree using breadth first search and return an array containing each node's value.

BinarySearchTree.prototype.breadthFirstSearch = function(){
	if (this.root === null){
		return undefined;
	}

	let array = [];
	let searchQueue = [];

	searchQueue.push(this.root);

	while (searchQueue.length > 0) {
		let element = searchQueue.shift();
		array.push(element.value);
		if (element.left !== null) {
			searchQueue.push(element.left);
		}
		if (element.right !== null) {
			searchQueue.push(element.right);
		}
	}

	return array;
}

// remove - This function should remove a node from a binary search tree. Your remove function should be able to handle removal of the root node, removal of a node with one child and removal of a node with two children. The function should return the node removed.

BinarySearchTree.prototype.remove = function(value){
	if (this.root === null) {
		return undefined;
	}

	let current = this.root;
	let parent = null;
	let direction = null;
	let found = false;

	while (!found && current) {
		if (current.value > value) {
			parent = current;
			current = current.left;
			direction = 'left';
		} else if (current.value < value) {
			parent = current;
			current = current.right;
			direction = 'right';
		} else {
			found = true;
		}
	}

	if (current.left === null && current.right === null) {
		if (direction === 'left') {
			parent.left = null;
			return current;
		}

		if (direction === 'right') {
			parent.right = null;
			return current;
		}
	}

	if (current.right !== null && current.left !== null) {
		let successor = this.findSuccesor(current);
		let tempLeft = current.left;
		let tempRight = current.right;

		current.right.left = null;
		if (direction === 'right') {
			parent.right = successor;
		} else {
			parent.left = successor;
		}
		successor.left = tempLeft;
		successor.right = tempRight;
		current.left = null;
		current.right = null;

		return current;
	}

	if (current.left !== null || current.right !== null) {
		if (current.left === null) {
			if (direction === 'right') {
				parent.right = current.right;
				current.right = null;
				return current;
			} else {
				parent.left = current.right;
				current.right = null;
				return current;
			}
		}

		if (current.right === null) {
			if (direction === 'left') {
				parent.left = current.left;
				current.left = null;
				return current;
			} else {
				parent.right = current.left;
				current.left = null;
				return current;
			}
		}
	}
}

BinarySearchTree.prototype.findSuccesor = function(current){
	if (current.right !== null && current.right.left === null) {
		return current.right;
	} 

	let temp = current.right;
	let found = false;

	while (!found) {
		if (temp.left !== null) {
			temp = temp.left;
		}

		if (temp.right === null) {
			found = true;
			return temp;
		} else {
			temp = temp.right;
		}
	}
}


let myTree = new BinarySearchTree();


myTree.insertIteratively(15).insertIteratively(20).insertIteratively(10).insertIteratively(12).insertIteratively(1).insertIteratively(5).insertIteratively(50).insertIteratively(60).insertIteratively(30).insertIteratively(25).insertIteratively(23).insertIteratively(24).insertIteratively(70);
console.log(myTree);
console.log(myTree.remove(10));
console.log(myTree);




