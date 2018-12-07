document.getElementById('start-button').addEventListener("click", start)
document.getElementById('refresh-button').addEventListener("click", refresh)

//function to start the application and retrieve the exchange rates data
function start() {
  // gets the base currency and user amount from the HTML
  const baseCurrency = getBaseCurrency()
  let userAmount = getUserAmount()
  // checks to make sure the user entered valid information
  if (!checkUserAmount(userAmount)) {
    userAmount = getUserAmount()
    alert('Enter a valid monetary amount')
  } 

  // gets the exchange rates from the API
  fetchData()
}

function refresh() {
  window.location.reload()
}

// function to control the flow of operations for the bellman ford path
function main(rates, currencies) {

  let allRatesArray = []
  for (let i in currencies) {
    let tempArray = Object.values(rates[i])
    allRatesArray.push(tempArray)
  }
  // console.log(allRatesArray)
  const ratesObject = arrayToObject()

  // returns a JavaScript Object so the exchange rates are easily accessible
  // uses the currency symbols
  function arrayToObjectWithNames() {
    let obj = {
      EUR: {
        EUR: 1,
        GBP: allRatesArray[0][0][1],
        CAD: allRatesArray[0][0][2],
        USD: allRatesArray[0][0][3],
        JPY: allRatesArray[0][0][4],
      },
      GBP: {
        EUR: allRatesArray[1][0][0],
        GBP: 1,
        CAD: allRatesArray[1][0][2],
        USD: allRatesArray[1][0][3],
        JPY: allRatesArray[1][0][4],
      },
      CAD: {
        EUR: allRatesArray[2][0][0],
        GBP: allRatesArray[2][0][1],
        CAD: 1,
        USD: allRatesArray[2][0][3],
        JPY: allRatesArray[2][0][4],
      },
      USD: {
        EUR: allRatesArray[3][0][0],
        GBP: allRatesArray[3][0][1],
        CAD: allRatesArray[3][0][2],
        USD: 1,
        JPY: allRatesArray[3][0][4],
      },
      JPY: {
        EUR: allRatesArray[4][0][0],
        GBP: allRatesArray[4][0][1],
        CAD: allRatesArray[4][0][2],
        USD: allRatesArray[4][0][3],
        JPY: 1,
      },
    }
    return obj
  }

  // returns a JavaScript Object so the exchange rates are easily accessible
  // uses the indicies of the array
  function arrayToObject() {
    let obj = {
      0: {
        0: 1,
        1: allRatesArray[0][0][1],
        2: allRatesArray[0][0][2],
        3: allRatesArray[0][0][3],
        4: allRatesArray[0][0][4],
      },
      1: {
        0: allRatesArray[1][0][0],
        1: 1,
        2: allRatesArray[1][0][2],
        3: allRatesArray[1][0][3],
        4: allRatesArray[1][0][4],
      },
      2: {
        0: allRatesArray[2][0][0],
        1: allRatesArray[2][0][1],
        2: 1,
        3: allRatesArray[2][0][3],
        4: allRatesArray[2][0][4],
      },
      3: {
        0: allRatesArray[3][0][0],
        1: allRatesArray[3][0][1],
        2: allRatesArray[3][0][2],
        3: 1,
        4: allRatesArray[3][0][4],
      },
      4: {
        0: allRatesArray[4][0][0],
        1: allRatesArray[4][0][1],
        2: allRatesArray[4][0][2],
        3: allRatesArray[4][0][3],
        4: 1,
      },
    }
    return obj
  }

  // creates a graph object for use of either the bellman-ford or floyd warshall algorithm
  let graph = new Graph(currencies.length, ratesObject, currencies)

  // floydWarshall(graph)
  // returns a demo shortest path for testing purposes
  let shortestPath = demoShortestPath(getBaseCurrency())

  // creating an array to hold the exchange rates between the currencies traversed
  let shortestPathRates = []

  // pushing the rates onto the array
  let i = 0
  while (i+1 < shortestPath.length) {
    shortestPathRates.push(ratesObject[shortestPath[i]][shortestPath[i+1]])
    i += 1
  }

  // converting the rates back to the original rates
  const finalRates = shortestPathRates.map((x) => {
    x *= -1
    return Math.floor(Math.exp(x))
  })

  // calculating the profit that the user has generated
  let profit = getUserAmount()
  for (rate of finalRates) {
    profit *= rate
  }

  // creating an array to hold the Currency Symbols of the vertices traversed
  shortestPathNames = []

  // filling the array with the Symbols
  for (i of shortestPath) {
    shortestPathNames.push(CURRENCIES[i])
  }

  // creating JavaScript Object to pass into the draw function
  let pathRates = arrayToObjectWithNames()

  // draws the graph with the given information
  draw(CURRENCIES, shortestPathNames, pathRates)

  // string to display on the HTML page showing the path that was taken
  let pathDisplay = `<p> The path taken was `
  for (let v of shortestPathNames) {
    pathDisplay += `${v} `
  }
  pathDisplay += '</p>'

  // generates a string to display the profit that was gained
  document.getElementById('displayPath').innerHTML = pathDisplay
  document.getElementById('displayToUser').innerHTML = `<p>You made ${profit} dollars, for a total of ${profit - getUserAmount()} dollars in profit!</p>`
  document.getElementById('refresh-button').classList.remove('hidden')
}

// retrieves the base currency from the user
function getBaseCurrency() {
  let e = document.getElementById('baseCurrency')
  let baseCurrency = e.value
  return baseCurrency
}

// getter and setter methods
// retrieves the monetary amount from the user
function getUserAmount() {
  let userAmount = document.getElementById('userAmount').value
  return userAmount
}

// checks to see if the user entered a valid amount
function checkUserAmount(userAmount) {
  const check = /^\$?[0-9]+\.?([0-9]{2})?$/
  if (check.test(userAmount)) {
    return true
  }
  return false
}
