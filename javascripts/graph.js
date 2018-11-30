class Graph {

  constructor(numberOfVertices, ratesObject, currencies) {
    this.adjMatrix = new Array(numberOfVertices)
    for (let i = 0; i < this.adjMatrix.length; i++) {
      this.adjMatrix[i] = new Array(numberOfVertices)
    }

    this.path = []

    // ratesObject[USD][GBP] => rate of usd -> gbp
    let EUR = 0
    let GBP = 1
    let CAD = 2
    let USD = 3
    let JPY = 4

    this.vertices = [EUR, GBP, CAD, USD, JPY]

    for (let startVertex of this.vertices) {
      for (let targetVertex of this.vertices) {
        this.adjMatrix[startVertex][targetVertex] = ratesObject[startVertex][targetVertex]
      }
    }



  }

  bellmanFord(startVertex, ratesObject) {
    let distance = new Array(this.vertices.length)
    let previous = new Array(this.vertices.length)   
    for (let i = 0; i < this.vertices.length; i++) {
      distance[i] = Number.MAX_SAFE_INTEGER
      previous[i] = undefined
    }

    distance[startVertex] = 0
    let tempDistance

    for (let v = 0; v < this.vertices.length; v++) {
      for (let u = 0; u < this.vertices.length; u++) {
        // this.adjMatrix[u][v]

        tempDistance = distance[u] + this.adjMatrix[u][v]
        if (tempDistance < distance[v]) {
          distance[v] = tempDistance
          previous[v] = u
          this.path.push(v)
        }
      }
    }
    // debugger
    for (let u = 0; u < this.vertices.length; u++) {
      for (let v = 0; v < this.vertices.length; v++) {
        if (distance[u] + this.adjMatrix[u][v] < distance[v]) {
          console.error(`${u} -> ${v}`)
        }
      }
    }
    // debugger
    console.log(distance, previous)

    let sum = 0
    let prod = 1
    for (let num of distance) {
      sum += num
      if (num != 0)
        prod *= num
    }

    console.log(`sum ${sum}`)
    console.log(`prod ${prod}`)

    console.log(`path: ${this.path}`)
  }

}