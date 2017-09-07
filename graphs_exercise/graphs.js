function Graph(){
	this.vertices = [];
	this.adjacencyList = {};
}

// addVertex - this function should add a node to the graph and place a new key in the adjacency list with the value of an empty array.

Graph.prototype.addVertex = function(value){
	this.vertices.push(value);
	this.adjacencyList[value] = [];
}

// addEdge - this function should add an edge between two nodes in the graph and place each value of the nodes in each array for the value of the node in the adjacency list.

Graph.prototype.addEdge = function(nodeOne, nodeTwo){
	if (this.adjacencyList.hasOwnProperty(nodeOne) && this.adjacencyList.hasOwnProperty(nodeTwo)) {
		this.adjacencyList[nodeOne].push(nodeTwo);
		this.adjacencyList[nodeTwo].push(nodeOne);
	}
}

// removeEdge - this function should accept two nodes and remove the edge between them. It should modify the adjacency list to ensure that both values are not in each array for the two nodes which no longer contain the edge.

Graph.prototype.removeEdge = function(nodeOne, nodeTwo){
	if (this.adjacencyList.hasOwnProperty(nodeOne) && this.adjacencyList.hasOwnProperty(nodeTwo)) {
		let nodeOneList = this.adjacencyList[nodeOne];
		let nodeTwoList = this.adjacencyList[nodeTwo];

		nodeOneList.forEach(function(edge, index){
			if (edge === nodeTwo) {
				nodeOneList.splice(index, 1);
			}
		})

		nodeTwoList.forEach(function(edge, index){
			if (edge === nodeOne) {
				nodeTwoList.splice(index, 1);
			}
		})
	}
}

// removeVertex - this function should remove the node in the array of nodes and also remove all edges that the removed node previously contained.

Graph.prototype.removeVertex = function(node){
	let verticeList = this.vertices;
	verticeList.forEach(function(vertice, index){
		if (vertice === node) {
			verticeList.splice(index, 1);
		}
	})

	for (let vertice in this.adjacencyList) {
		let edgeList = this.adjacencyList[vertice];
		edgeList.forEach(function(edge, index){
			if (edge === node) {
				edgeList.splice(index, 1);
			}
		})
	}
}

// size - this function should return the number of vertices

Graph.prototype.size = function(){
	return this.vertices.length;
}

// numberOfEdges - this function should return the number of edges the graph contains

Graph.prototype.numberOfEdges = function(){
	let num = 0;

	for (let vertice in this.adjacencyList) {
		let edges = this.adjacencyList[vertice];
		num += edges.length;
	}

	return num;
}

// depthFirstSearch - this function should return an array of nodes visited using DFS

Graph.prototype.depthFirstSearch = function(start){
	let stack = [start];
	let foundVertices = [];

	this.adjacencyList[start].visited = true;

	while (stack.length > 0) {
		let node = stack.pop();
		let edges = this.adjacencyList[node];

		foundVertices.push(node);

		edges.forEach(function(edge){
			if (!this.adjacencyList[edge].visited){
				this.adjacencyList[edge].visited = true;
				stack.push(edge);
			}
		}, this)
	}

	return foundVertices;
}

// breadthFirstSearch - this function should return an array of nodes visited using BFS

Graph.prototype.breadthFirstSearch = function(start){
	let queue = [start];
	let foundVertices = [];

	this.adjacencyList[start].visited = true;

	while (queue.length > 0) {
		let node = queue.shift();
		let edges = this.adjacencyList[node];

		foundVertices.push(node);

		edges.forEach(function(edge){
			if (!this.adjacencyList[edge].visited){
				this.adjacencyList[edge].visited = true;
				queue.push(edge);
			}
		}, this)
	}

	return foundVertices;
}

// Create a constructor function for a `WeightedGraph`. It should inherit from the `Graph` constructor and have all the same methods except for adding an edge. Since weights will now be added with edges, the adjacency list should not only store the nodes which are connected to it but also the corresponding weight of the edge.

function WeightedGraph(){
	Graph.apply(this);
}

WeightedGraph.prototype = Object.create(Graph.prototype);
WeightedGraph.prototype.constructor = Graph;

WeightedGraph.prototype.addWeightedEdge = function(vertice1, vertice2, weight){
	if (this.adjacencyList.hasOwnProperty(vertice1) && this.adjacencyList.hasOwnProperty(vertice2)) {
		this.adjacencyList[vertice1].push([vertice2, weight]);
		this.adjacencyList[vertice2].push([vertice1, weight]);
	}
}

function priorityQueue(){
	this.queue = [];
}

function Vertice(vertice, weight, pathVia){
	this.vertice = vertice;
	this.weight = weight;
	this.pathVia = pathVia;
}

priorityQueue.prototype.addVertice = function(vertice, weight, pathVia){
	let node = new Vertice(vertice, weight, pathVia);
	this.queue.push(node);
}

priorityQueue.prototype.minSort = function(){
	this.queue.sort(function(a, b){
		return a.weight - b.weight;
	});
}

priorityQueue.prototype.remove = function(){
	return this.queue.shift();
}

priorityQueue.prototype.getLength = function(){
	let length = 0;

	this.queue.forEach(function(element){
		length += 1;
	})

	return length;
}


// Dijkstra - this function should return an array with two values, the first being the total distance and the second an array of nodes which create the shortest path.

WeightedGraph.prototype.dijkstra = function(start, end){
	let visited = [];
	let distance = 0;
	let path = [];
	let smallest = undefined;
	let queue = new priorityQueue;

	queue.addVertice(start, 0, '');

	while (queue.getLength() > 0) {
		smallest = queue.remove();
		visited.push(smallest.vertice);

		if (smallest.vertice === end) {
			distance = smallest.weight;
			path = smallest.pathVia.split('').concat(end);
			return [distance, path];
		} else {
			let connections = this.adjacencyList[smallest.vertice];
			connections.forEach(function(element){
				if (!visited.includes(element[0])) {
					let weight = smallest.weight + element[1];
					let pathFrom = smallest.pathVia.concat(smallest.vertice);
					queue.addVertice(element[0], weight, pathFrom);
				}
			}, this)
			queue.minSort;
		}
	}
}






