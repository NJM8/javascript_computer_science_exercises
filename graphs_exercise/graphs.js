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


let testGraph = new WeightedGraph;

testGraph.addVertex('AA');
testGraph.addVertex('AB');
testGraph.addVertex('AC');
testGraph.addVertex('AD');
testGraph.addVertex('AE');
testGraph.addVertex('AF');
testGraph.addVertex('AG');
testGraph.addVertex('AH');
testGraph.addVertex('AI');
testGraph.addVertex('AJ');
testGraph.addVertex('AK');
testGraph.addVertex('AL');
testGraph.addVertex('AM');
testGraph.addVertex('AN');
testGraph.addVertex('AO');
testGraph.addVertex('AP');
testGraph.addVertex('AQ');
testGraph.addVertex('AR');
testGraph.addVertex('AS');
testGraph.addVertex('AT');
testGraph.addVertex('AU');
testGraph.addVertex('AV');
testGraph.addVertex('AW');
testGraph.addVertex('AX');
testGraph.addVertex('AY');
testGraph.addVertex('AZ');
testGraph.addVertex('BA');
testGraph.addVertex('BB');
testGraph.addVertex('BC');
testGraph.addVertex('BD');
testGraph.addVertex('BE');
testGraph.addVertex('BF');
testGraph.addVertex('BG');
testGraph.addVertex('BH');
testGraph.addVertex('BI');
testGraph.addVertex('BJ');
testGraph.addVertex('BK');
testGraph.addVertex('BL');
testGraph.addVertex('BM');
testGraph.addVertex('BN');
testGraph.addVertex('BO');
testGraph.addVertex('BP');
testGraph.addVertex('BQ');
testGraph.addVertex('BR');
testGraph.addVertex('BS');
testGraph.addVertex('BT');
testGraph.addVertex('BU');
testGraph.addVertex('BV');
testGraph.addVertex('BW');
testGraph.addVertex('BX');
testGraph.addVertex('BY');
testGraph.addVertex('BZ');
testGraph.addVertex('CA');
testGraph.addVertex('CB');
testGraph.addVertex('CC');
testGraph.addVertex('CD');
testGraph.addVertex('CE');
testGraph.addVertex('CF');
testGraph.addVertex('CG');
testGraph.addVertex('CH');
testGraph.addVertex('CI');
testGraph.addVertex('CJ');
testGraph.addVertex('CK');
testGraph.addVertex('CL');
testGraph.addVertex('CM');
testGraph.addVertex('CN');
testGraph.addVertex('CO');
testGraph.addVertex('CP');
testGraph.addVertex('CQ');
testGraph.addVertex('CR');
testGraph.addVertex('CS');
testGraph.addVertex('CT');
testGraph.addVertex('CU');
testGraph.addVertex('CV');
testGraph.addVertex('CW');
testGraph.addVertex('CX');
testGraph.addVertex('CY');
testGraph.addVertex('CZ');
testGraph.addVertex('DA');
testGraph.addVertex('DB');
testGraph.addVertex('DC');
testGraph.addVertex('DD');
testGraph.addVertex('DE');
testGraph.addVertex('DF');
testGraph.addVertex('DG');
testGraph.addVertex('DH');
testGraph.addVertex('DI');
testGraph.addVertex('DJ');
testGraph.addVertex('DK');
testGraph.addVertex('DL');
testGraph.addVertex('DM');
testGraph.addVertex('DN');
testGraph.addVertex('DO');
testGraph.addVertex('DP');
testGraph.addVertex('DQ');
testGraph.addVertex('DR');
testGraph.addVertex('DS');
testGraph.addVertex('DT');
testGraph.addVertex('DU');
testGraph.addVertex('DV');
testGraph.addVertex('DW');
testGraph.addVertex('DX');
testGraph.addVertex('DY');
testGraph.addVertex('DZ');
testGraph.addVertex('EA');
testGraph.addVertex('EB');
testGraph.addVertex('EC');
testGraph.addVertex('ED');
testGraph.addVertex('EE');
testGraph.addVertex('EF');
testGraph.addVertex('EG');
testGraph.addVertex('EH');
testGraph.addVertex('EI');
testGraph.addVertex('EJ');
testGraph.addVertex('EK');
testGraph.addVertex('EL');
testGraph.addVertex('EM');
testGraph.addVertex('EN');
testGraph.addVertex('EO');
testGraph.addVertex('EP');
testGraph.addVertex('EQ');
testGraph.addVertex('ER');
testGraph.addVertex('ES');
testGraph.addVertex('ET');
testGraph.addVertex('EU');
testGraph.addVertex('EV');
testGraph.addVertex('EW');
testGraph.addVertex('EX');
testGraph.addVertex('EY');
testGraph.addVertex('EZ');
testGraph.addVertex('FA');
testGraph.addVertex('FB');
testGraph.addVertex('FC');
testGraph.addVertex('FD');
testGraph.addVertex('FE');
testGraph.addVertex('FF');
testGraph.addVertex('FG');
testGraph.addVertex('FH');
testGraph.addVertex('FI');
testGraph.addVertex('FJ');
testGraph.addVertex('FK');
testGraph.addVertex('FL');
testGraph.addVertex('FM');
testGraph.addVertex('FN');
testGraph.addVertex('FO');
testGraph.addVertex('FP');
testGraph.addVertex('FQ');
testGraph.addVertex('FR');
testGraph.addVertex('FS');
testGraph.addVertex('FT');
testGraph.addVertex('FU');
testGraph.addVertex('FV');
testGraph.addVertex('FW');
testGraph.addVertex('FX');
testGraph.addVertex('FY');
testGraph.addVertex('FZ');
testGraph.addVertex('GA');
testGraph.addVertex('GB');
testGraph.addVertex('GC');
testGraph.addVertex('GD');
testGraph.addVertex('GE');
testGraph.addVertex('GF');
testGraph.addVertex('GG');
testGraph.addVertex('GH');
testGraph.addVertex('GI');
testGraph.addVertex('GJ');
testGraph.addVertex('GK');
testGraph.addVertex('GL');
testGraph.addVertex('GM');
testGraph.addVertex('GN');
testGraph.addVertex('GO');
testGraph.addVertex('GP');
testGraph.addVertex('GQ');
testGraph.addVertex('GR');
testGraph.addVertex('GS');
testGraph.addVertex('GT');
testGraph.addVertex('GU');
testGraph.addVertex('GV');
testGraph.addVertex('GW');
testGraph.addVertex('GX');
testGraph.addVertex('GY');
testGraph.addVertex('GZ');
testGraph.addWeightedEdge('AA', 'AB', 7);
testGraph.addWeightedEdge('AA', 'AE', 2);
testGraph.addWeightedEdge('AA', 'AC', 3);
testGraph.addWeightedEdge('AE', 'AF', 6);
testGraph.addWeightedEdge('AE', 'AD', 8);
testGraph.addWeightedEdge('AC', 'AD', 4);
testGraph.addWeightedEdge('AC', 'AQ', 3);
testGraph.addWeightedEdge('AC', 'AT', 9);
testGraph.addWeightedEdge('AC', 'AB', 14);
testGraph.addWeightedEdge('AB', 'AT', 11);
testGraph.addWeightedEdge('AD', 'AF', 5);
testGraph.addWeightedEdge('AF', 'AI', 5);
testGraph.addWeightedEdge('AF', 'AG', 4);
testGraph.addWeightedEdge('AG', 'AO', 7);
testGraph.addWeightedEdge('AO', 'AQ', 5);
testGraph.addWeightedEdge('AQ', 'AT', 2);
testGraph.addWeightedEdge('AT', 'BA', 6);
testGraph.addWeightedEdge('AT', 'AZ', 4);
testGraph.addWeightedEdge('BA', 'BB', 3);
testGraph.addWeightedEdge('BB', 'AZ', 5);
testGraph.addWeightedEdge('AZ', 'BC', 2);
testGraph.addWeightedEdge('BB', 'BJ', 7);
testGraph.addWeightedEdge('BJ', 'BK', 6);
testGraph.addWeightedEdge('BK', 'BO', 2);
testGraph.addWeightedEdge('BJ', 'BI', 5);
testGraph.addWeightedEdge('BI', 'BO', 4);
testGraph.addWeightedEdge('BO', 'BL', 3);
testGraph.addWeightedEdge('BL', 'BP', 1);
testGraph.addWeightedEdge('BO', 'BU', 5);
testGraph.addWeightedEdge('BP', 'BU', 7);
testGraph.addWeightedEdge('BP', 'BN', 3);
testGraph.addWeightedEdge('BU', 'BV', 2);
testGraph.addWeightedEdge('BV', 'BJ', 4);
testGraph.addWeightedEdge('AI', 'AH', 6);
testGraph.addWeightedEdge('AG', 'AH', 3);
testGraph.addWeightedEdge('AG', 'AM', 1);
testGraph.addWeightedEdge('AO', 'AM', 8);
testGraph.addWeightedEdge('AO', 'AP', 2);
testGraph.addWeightedEdge('AQ', 'AP', 4);
testGraph.addWeightedEdge('AH', 'AM', 4);
testGraph.addWeightedEdge('AH', 'AK', 2);
testGraph.addWeightedEdge('AH', 'AL', 3);
testGraph.addWeightedEdge('AJ', 'AK', 8);
testGraph.addWeightedEdge('AJ', 'CA', 6);
testGraph.addWeightedEdge('AK', 'CA', 1);
testGraph.addWeightedEdge('AL', 'CB', 3);
testGraph.addWeightedEdge('AL', 'AN', 4);
testGraph.addWeightedEdge('AN', 'CB', 5);
testGraph.addWeightedEdge('AN', 'CF', 2);
testGraph.addWeightedEdge('AN', 'AS', 6);
testGraph.addWeightedEdge('AP', 'AS', 8);
testGraph.addWeightedEdge('AP', 'AR', 7);
testGraph.addWeightedEdge('AR', 'AS', 9);
testGraph.addWeightedEdge('AR', 'AW', 5);
testGraph.addWeightedEdge('AR', 'AV', 11);
testGraph.addWeightedEdge('AQ', 'AU', 7);
testGraph.addWeightedEdge('AU', 'AV', 3);
testGraph.addWeightedEdge('AU', 'AY', 6);
testGraph.addWeightedEdge('AU', 'BD', 1);
testGraph.addWeightedEdge('BC', 'BD', 4);
testGraph.addWeightedEdge('BD', 'AY', 1);
testGraph.addWeightedEdge('AS', 'AW', 8);
testGraph.addWeightedEdge('AW', 'CL', 2);
testGraph.addWeightedEdge('AW', 'CP', 4);
testGraph.addWeightedEdge('AW', 'AX', 3);
testGraph.addWeightedEdge('AV', 'AX', 4);
testGraph.addWeightedEdge('AV', 'BG', 8);
testGraph.addWeightedEdge('AV', 'AY', 10);
testGraph.addWeightedEdge('AX', 'BG', 1);
testGraph.addWeightedEdge('AX', 'CP', 2);
testGraph.addWeightedEdge('BE', 'BG', 6);
testGraph.addWeightedEdge('BE', 'BH', 3);
testGraph.addWeightedEdge('BE', 'BF', 2);
testGraph.addWeightedEdge('BF', 'BL', 4);
testGraph.addWeightedEdge('BF', 'BN', 5);
testGraph.addWeightedEdge('BN', 'BH', 6);
testGraph.addWeightedEdge('BN', 'BM', 3);
testGraph.addWeightedEdge('BN', 'BQ', 1);
testGraph.addWeightedEdge('BQ', 'BJ', 2);
testGraph.addWeightedEdge('BJ', 'BW', 3);
testGraph.addWeightedEdge('BJ', 'BZ', 7);
testGraph.addWeightedEdge('BZ', 'BW', 1);
testGraph.addWeightedEdge('BG', 'BH', 8);
testGraph.addWeightedEdge('BG', 'CW', 7);
testGraph.addWeightedEdge('BM', 'BR', 2);
testGraph.addWeightedEdge('BQ', 'BR', 4);
testGraph.addWeightedEdge('BR', 'DJ', 7);
testGraph.addWeightedEdge('BR', 'DK', 6);
testGraph.addWeightedEdge('BR', 'BS', 3);
testGraph.addWeightedEdge('BS', 'BX', 5);
testGraph.addWeightedEdge('BS', 'BW', 6);
testGraph.addWeightedEdge('BW', 'BY', 8);
testGraph.addWeightedEdge('BX', 'BY', 10);
testGraph.addWeightedEdge('BX', 'DK', 4);
testGraph.addWeightedEdge('BX', 'DS', 2);
testGraph.addWeightedEdge('BY', 'DT', 9);
testGraph.addWeightedEdge('CA', 'CC', 5);
testGraph.addWeightedEdge('CA', 'CB', 7);
testGraph.addWeightedEdge('CC', 'CD', 2);
testGraph.addWeightedEdge('CC', 'CE', 3);
testGraph.addWeightedEdge('CF', 'CE', 9);
testGraph.addWeightedEdge('CF', 'CG', 2);
testGraph.addWeightedEdge('CD', 'CI', 2);
testGraph.addWeightedEdge('CD', 'CE', 4);
testGraph.addWeightedEdge('CE', 'CH', 1);
testGraph.addWeightedEdge('CG', 'CH', 3);
testGraph.addWeightedEdge('CG', 'CK', 4);
testGraph.addWeightedEdge('CL', 'CK', 5);
testGraph.addWeightedEdge('CL', 'CP', 3);
testGraph.addWeightedEdge('CK', 'CN', 6);
testGraph.addWeightedEdge('CP', 'CN', 9);
testGraph.addWeightedEdge('CP', 'CS', 7);
testGraph.addWeightedEdge('CW', 'CS', 4);
testGraph.addWeightedEdge('CW', 'CV', 5);
testGraph.addWeightedEdge('CW', 'DA', 6);
testGraph.addWeightedEdge('CI', 'EA', 3);
testGraph.addWeightedEdge('CI', 'EC', 3);
testGraph.addWeightedEdge('CI', 'CJ', 4);
testGraph.addWeightedEdge('CJ', 'EH', 5);
testGraph.addWeightedEdge('CJ', 'CM', 6);
testGraph.addWeightedEdge('CM', 'EJ', 9);
testGraph.addWeightedEdge('CM', 'CO', 7);
testGraph.addWeightedEdge('CN', 'CQ', 4);
testGraph.addWeightedEdge('CS', 'CQ', 5);
testGraph.addWeightedEdge('CS', 'CV', 3);
testGraph.addWeightedEdge('CV', 'CQ', 4);
testGraph.addWeightedEdge('CQ', 'CO', 6);
testGraph.addWeightedEdge('CO', 'EJ', 2);
testGraph.addWeightedEdge('CQ', 'CR', 1);
testGraph.addWeightedEdge('CV', 'CT', 2);
testGraph.addWeightedEdge('CV', 'CX', 3);
testGraph.addWeightedEdge('CZ', 'CX', 9);
testGraph.addWeightedEdge('CT', 'CR', 2);
testGraph.addWeightedEdge('CR', 'EO', 3);
testGraph.addWeightedEdge('CT', 'CU', 7);
testGraph.addWeightedEdge('CU', 'EQ', 4);
testGraph.addWeightedEdge('CU', 'CY', 6);
testGraph.addWeightedEdge('CX', 'DF', 9);
testGraph.addWeightedEdge('CY', 'DF', 3);
testGraph.addWeightedEdge('CY', 'ER', 5);
testGraph.addWeightedEdge('CZ', 'DB', 10);
testGraph.addWeightedEdge('CZ', 'DC', 1);
testGraph.addWeightedEdge('DA', 'DC', 4);
testGraph.addWeightedEdge('DJ', 'DC', 2);
testGraph.addWeightedEdge('DJ', 'DI', 3);
testGraph.addWeightedEdge('DJ', 'DK', 1);
testGraph.addWeightedEdge('DK', 'DI', 4);
testGraph.addWeightedEdge('DK', 'DS', 12);
testGraph.addWeightedEdge('DS', 'DL', 4);
testGraph.addWeightedEdge('DC', 'DI', 1);
testGraph.addWeightedEdge('DI', 'DH', 2);
testGraph.addWeightedEdge('DI', 'DL', 2);
testGraph.addWeightedEdge('DL', 'DR', 8);
testGraph.addWeightedEdge('DT', 'DR', 2);
testGraph.addWeightedEdge('DT', 'DU', 4);
testGraph.addWeightedEdge('DU', 'DV', 3);
testGraph.addWeightedEdge('DR', 'DM', 7);
testGraph.addWeightedEdge('DB', 'DF', 3);
testGraph.addWeightedEdge('DE', 'DF', 4);
testGraph.addWeightedEdge('DE', 'DG', 3);
testGraph.addWeightedEdge('DE', 'DH', 6);
testGraph.addWeightedEdge('DF', 'EW', 7);
testGraph.addWeightedEdge('DG', 'EZ', 4);
testGraph.addWeightedEdge('DG', 'FD', 2);
testGraph.addWeightedEdge('DG', 'DN', 2);
testGraph.addWeightedEdge('DN', 'FD', 4);
testGraph.addWeightedEdge('DR', 'DM', 7);
testGraph.addWeightedEdge('DM', 'DN', 7);
testGraph.addWeightedEdge('DM', 'DP', 2);
testGraph.addWeightedEdge('DQ', 'DO', 4);
testGraph.addWeightedEdge('DQ', 'DV', 3);
testGraph.addWeightedEdge('DV', 'DX', 8);
testGraph.addWeightedEdge('DX', 'DZ', 7);
testGraph.addWeightedEdge('DX', 'DW', 1);
testGraph.addWeightedEdge('DO', 'FD', 5);
testGraph.addWeightedEdge('DP', 'FG', 7);
testGraph.addWeightedEdge('DP', 'DW', 3);
testGraph.addWeightedEdge('DW', 'DY', 2);
testGraph.addWeightedEdge('DZ', 'DY', 4);
testGraph.addWeightedEdge('DY', 'FK', 6);
testGraph.addWeightedEdge('EA', 'EB', 4);
testGraph.addWeightedEdge('EA', 'EC', 5);
testGraph.addWeightedEdge('EC', 'ED', 6);
testGraph.addWeightedEdge('EC', 'EH', 7);
testGraph.addWeightedEdge('EB', 'EE', 3);
testGraph.addWeightedEdge('EB', 'ED', 4);
testGraph.addWeightedEdge('ED', 'EE', 2);
testGraph.addWeightedEdge('ED', 'EH', 3);
testGraph.addWeightedEdge('EH', 'EJ', 8);
testGraph.addWeightedEdge('EE', 'EF', 1);
testGraph.addWeightedEdge('EF', 'GC', 7);
testGraph.addWeightedEdge('EH', 'EG', 7);
testGraph.addWeightedEdge('EG', 'GC', 6);
testGraph.addWeightedEdge('EG', 'EI', 2);
testGraph.addWeightedEdge('EI', 'GB', 3);
testGraph.addWeightedEdge('EI', 'EL', 4);
testGraph.addWeightedEdge('EL', 'GA', 7);
testGraph.addWeightedEdge('EJ', 'EK', 6);
testGraph.addWeightedEdge('EJ', 'EN', 5);
testGraph.addWeightedEdge('EJ', 'EO', 4);
testGraph.addWeightedEdge('EO', 'EQ', 3);
testGraph.addWeightedEdge('EQ', 'EN', 2);
testGraph.addWeightedEdge('EK', 'EM', 6);
testGraph.addWeightedEdge('EM', 'EL', 8);
testGraph.addWeightedEdge('EM', 'FZ', 9);
testGraph.addWeightedEdge('EN', 'ET', 7);
testGraph.addWeightedEdge('EN', 'EP', 4);
testGraph.addWeightedEdge('ET', 'FZ', 2);
testGraph.addWeightedEdge('ET', 'FY', 7);
testGraph.addWeightedEdge('ET', 'ES', 3);
testGraph.addWeightedEdge('EQ', 'ER', 6);
testGraph.addWeightedEdge('ER', 'EP', 4);
testGraph.addWeightedEdge('ER', 'EV', 5);
testGraph.addWeightedEdge('ER', 'EW', 4);
testGraph.addWeightedEdge('EU', 'FX', 2);
testGraph.addWeightedEdge('EV', 'FA', 3);
testGraph.addWeightedEdge('EX', 'FA', 2);
testGraph.addWeightedEdge('EW', 'EZ', 2);
testGraph.addWeightedEdge('EW', 'EY', 6);
testGraph.addWeightedEdge('EZ', 'EY', 2);
testGraph.addWeightedEdge('EY', 'FB', 4);
testGraph.addWeightedEdge('EY', 'FC', 5);
testGraph.addWeightedEdge('EZ', 'FD', 3);
testGraph.addWeightedEdge('FD', 'FF', 1);
testGraph.addWeightedEdge('FG', 'FF', 7);
testGraph.addWeightedEdge('FG', 'FK', 6);
testGraph.addWeightedEdge('FK', 'FI', 1);
testGraph.addWeightedEdge('FK', 'FN', 3);
testGraph.addWeightedEdge('FN', 'FL', 2);
testGraph.addWeightedEdge('FN', 'FO', 7);
testGraph.addWeightedEdge('FF', 'FI', 2);
testGraph.addWeightedEdge('FI', 'FL', 4);
testGraph.addWeightedEdge('FL', 'FO', 8);
testGraph.addWeightedEdge('FL', 'FM', 9);
testGraph.addWeightedEdge('FI', 'FH', 5);
testGraph.addWeightedEdge('FC', 'FE', 3);
testGraph.addWeightedEdge('FE', 'FH', 7);
testGraph.addWeightedEdge('FH', 'FT', 6);
testGraph.addWeightedEdge('FO', 'FM', 2);
testGraph.addWeightedEdge('FO', 'FP', 2);
testGraph.addWeightedEdge('FM', 'FP', 3);
testGraph.addWeightedEdge('FP', 'FQ', 2);
testGraph.addWeightedEdge('FM', 'FR', 9);
testGraph.addWeightedEdge('FR', 'FQ', 2);
testGraph.addWeightedEdge('FQ', 'GY', 1);
testGraph.addWeightedEdge('GY', 'GX', 1);
testGraph.addWeightedEdge('FR', 'GW', 7);
testGraph.addWeightedEdge('FR', 'GU', 6);
testGraph.addWeightedEdge('FA', 'FW', 1);
testGraph.addWeightedEdge('FA', 'FB', 4);
testGraph.addWeightedEdge('FB', 'FU', 5);
testGraph.addWeightedEdge('FE', 'FV', 6);
testGraph.addWeightedEdge('FZ', 'GA', 6);
testGraph.addWeightedEdge('FZ', 'GF', 4);
testGraph.addWeightedEdge('FY', 'GG', 3);
testGraph.addWeightedEdge('FY', 'FX', 3);
testGraph.addWeightedEdge('FX', 'FW', 3);
testGraph.addWeightedEdge('FW', 'GM', 4);
testGraph.addWeightedEdge('FV', 'GN', 2);
testGraph.addWeightedEdge('FV', 'GO', 3);
testGraph.addWeightedEdge('FV', 'FU', 7);
testGraph.addWeightedEdge('FU', 'GQ', 4);
testGraph.addWeightedEdge('FU', 'FT', 6);
testGraph.addWeightedEdge('FT', 'GS', 5);
testGraph.addWeightedEdge('FT', 'FS', 8);
testGraph.addWeightedEdge('FS', 'FJ', 7);
testGraph.addWeightedEdge('GW', 'GV', 5);
testGraph.addWeightedEdge('GU', 'GV', 4);
testGraph.addWeightedEdge('GV', 'GT', 3);
testGraph.addWeightedEdge('GS', 'GT', 2);
testGraph.addWeightedEdge('GS', 'GQ', 3);
testGraph.addWeightedEdge('GT', 'GR', 4);
testGraph.addWeightedEdge('GQ', 'GR', 2);
testGraph.addWeightedEdge('GQ', 'GO', 2);
testGraph.addWeightedEdge('GO', 'GP', 1);
testGraph.addWeightedEdge('GN', 'GM', 7);
testGraph.addWeightedEdge('GM', 'GZ', 2);
testGraph.addWeightedEdge('GH', 'GZ', 3);
testGraph.addWeightedEdge('GH', 'GI', 4);
testGraph.addWeightedEdge('GH', 'GG', 7);
testGraph.addWeightedEdge('GC', 'GB', 2);
testGraph.addWeightedEdge('GB', 'GD', 5);
testGraph.addWeightedEdge('GB', 'GA', 6);
testGraph.addWeightedEdge('GD', 'GE', 2);
testGraph.addWeightedEdge('GA', 'GF', 5);
testGraph.addWeightedEdge('GE', 'GL', 7);
testGraph.addWeightedEdge('GE', 'GF', 3);
testGraph.addWeightedEdge('GL', 'GK', 1);
testGraph.addWeightedEdge('GF', 'GK', 4);
testGraph.addWeightedEdge('GF', 'GJ', 5);
testGraph.addWeightedEdge('GJ', 'GG', 6);

console.log(testGraph.dijkstra('AA', 'GZ'));

 


