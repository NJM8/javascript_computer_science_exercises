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

// numberOfEdges - this function should return the number of edges the graph contains

// depthFirstSearch - this function should return an array of nodes visited using DFS

// breadthFirstSearch - this function should return an array of nodes visited using BFS

// Create a constructor function for a `WeightedGraph`. It should inherit from the `Graph` constructor and have all the same methods except for adding an edge. Since weights will now be added with edges, the adjacency list should not only store the nodes which are connected to it but also the corresponding weight of the edge.

// Dijkstra - this function should return an array with two values, the first being the total distance and the second an array of nodes which create the shortest path.