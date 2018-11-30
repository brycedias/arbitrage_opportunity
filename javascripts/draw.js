// let edgeObj;
// let nodeObj;

// //set to avoid adding duplicate edges
// let edgeSet = new Set();

// //creating the graph object via cytoscape.js
// var cy = cytoscape({
//   //html container to place the finished graph
//   container: document.getElementById('cy'),

//   //specifying the styles of the graph
//   style: [{
//       //styles of the individual nodes
//       selector: 'node',
//       style: {
//         'background-color': '#500',
//         'label': 'data(id)'
//       }
//     },

//     {
//       //styles of the individual edges
//       selector: 'edge',
//       style: {
//         'width': 3,
//         'curve-style': 'bezier',
//         'line-color': '#ccc',
//         'target-arrow-color': '#ccc',
//         'target-arrow-shape': 'triangle',
//         'label': 'data(weight)',
//         'text-valign': 'top'
//       }
//     },

//     {
//       //styles of the edges that are part of the shortest path
//       selector: '.highlighted',
//       style: {
//         'line-color': '#f4b942',
//         'target-arrow-color': '#f4b942'
//       }
//     }
//   ]

// });

// //adding each currency as a node of the graph
// for (let node of currencies) {
//   nodeObj = [{
//     group: 'nodes',
//     data: {
//       id: `${node}`
//     }
//   }]
//   cy.add(nodeObj)
// }

// //adding the edges of the graph with the exchange rate as the edge weight
// for (let head of currencies) {
//   for (let tail of currencies) {
//     for (let i = 0; i < shortest_path.length - 1; i++) {
//       if ((head == shortest_path[i] && tail == shortest_path[i + 1])) {
//         //specifying the edge object required by Cytoscape.js
//         edgeObj = [{
//           group: 'edges',
//           data: {
//             id: `${head}->${tail}`,
//             weight: rates[head][tail],
//             source: head,
//             target: tail
//           }
//         }]
//         //adding the edges that are part of the path to the graph object with the highlighted class
//         cy.add(edgeObj).addClass('highlighted')
//         edgeSet.add(`${head}->${tail}`)
//       }
//     }
//     if ((head !== tail)) {
//       if (!(edgeSet.has(`${head}->${tail}`))) {
//         edgeObj = [{
//           group: 'edges',
//           data: {
//             id: `${head}->${tail}`,
//             weight: rates[head][tail],
//             source: head,
//             target: tail
//           }
//         }]
//         cy.add(edgeObj)
//         edgeSet.add(`${head}->${tail}`)
//       }
//     }
//   }
// }

// let layout = cy.layout({
//   name: 'circle',
//   rows: 1
// })
