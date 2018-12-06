 // Floyd-Warshall Algorithm
 // graph object contains currencies.length, ratesObject, currencies
function floydWarshall(G) { 
// creation of  5-by-5 adjMatrix
  let V = G.adjMatrix.length 
  let dist = new Array(V)
  for (let i = 0; i < V; i++) {
    dist[i] = new Array(V)
  }

  // initializing each of the indices to 0
  for (let v = 0; v < V; v++) {
    dist[v][v] = 0
  }

  // initializing each of the rates of dist to the rates of the graph's adjMatrix
  for (let u = 0; u < V; u++) {
    for (let v = 0; v < V; v++) {
      dist[u][v] = G.adjMatrix[u][v]
    }
  }
  
  // Floyd-Warshall Algorithm
	// progress through each distance between each of the vertices
	// and if the distance between the vertices is shorter betweeen
	// a combination of two edge pathways than the first,
	// then it becomes the new shortest distance between the vertices
  for (let k = 1; k < V; k++){
	  for (let i = 1; i < V; i++){
		  for (let j = 1; j < V; j++){
			  if (dist[i][j] > dist[i][k] + dist[k][j]){
				  dist[i][j] = dist[i][k] + dist[k][j]
			  }
		  }
	  }
  }
}

// hardcoded function whose shortest path is based on
// the baseCurrency selected
function demoShortestPath(base) {
  switch (base) {
    case 'EUR':
      return [0, 3, 4, 0]
    case 'USD':
      return [3, 0, 2, 1, 3]
    case 'GBP':
      return [1, 2, 1]
    case 'CAD':
      return [2, 1, 0, 3, 2]
    case 'JPY':
      return [4, 0, 3, 4]
  }
}








