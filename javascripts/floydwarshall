/*


Bryce and I took implemented the Floyd-Warshall algorithm
based on the algorithm below:



let V = number of vertices in graph
let dist = V * V array of minimum distances
for each vertex v
	dist[v][v] <- 0
for each edge(u,v)
	dist[u][v] <- weight(u,v)
for k from 1 to V
	for i from 1 to V
		for j from 1 to V
			if dist[i][j] > dist[i][k] + dist[k][j]
				dist[i][j] <- dist[i][k] + dist[k][j]
			end if
*/

function floydWarshall(G) {
  let V = G.adjMatrix.length
  let dist = new Array(V)
  for (let i = 0; i < V; i++) {
    dist[i] = new Array(V)
  }
  //debugger
  //console.log('first dist', dist)
  for (let v = 0; v < V; v++) {
    dist[v][v] = 1
  }
  //debugger
  //console.log('second dist', dist)
  for (let u = 0; u < V; u++) {
    for (let v = 0; v < V; v++) {
      dist[u][v] = G.adjMatrix[u][v]
    }
  }
  debugger
  
  console.log('%cOrder of Currency Arrays: EUR, GBP, CAD, USD, JPY', 'color: green')
  console.log('%cG.adjMatrix (Natural log of original rates)', 'color: red;')
  console.log(G.adjMatrix)
  //console.log('third dist', dist)
  
  for (let k = 1; k < V; k++){
	  for (let i = 1; i < V; i++){
		  for (let j = 1; j < V; j++){
			  if (dist[i][j] > dist[i][k] + dist[k][j]){
				  dist[i][j] = dist[i][k] + dist[k][j]
			  }
		  }
	  }
  }
  debugger
  console.log('%cOrder of Currency Arrays: EUR, GBP, CAD, USD, JPY', 'color: green')
  console.log('%cshortest distances found between all points', 'color: blue;')
  console.log(dist)
 

}










