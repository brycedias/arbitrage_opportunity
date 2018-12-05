document.getElementById('start-button').addEventListener("click", start)

//function to start the application and retrieve the exchange rates data
function start() {
  // gets the base currency and user amount from the HTML
  const baseCurrency = getBaseCurrency()
  let userAmount = getUserAmount()
  // checks to make sure the user entered valid information
  if (!checkUserAmount(userAmount)) {
    userAmount = getUserAmount()
    alert('Enter a valid monetary amount')
  } else {
    // setBaseCurrency(baseCurrency)
    // setAmount(userAmount)
  }
  // gets the exchange rates from the API
  fetchData()
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

  let graph = new Graph(currencies.length, ratesObject, currencies)

  // floydWarshall(graph)
  let shortestPath = demoShortestPath(getBaseCurrency())

  let shortestPathRates = []
  let i = 0
  let j = 1

  while (j < shortestPath.length) {
    shortestPathRates.push(ratesObject[shortestPath[i]][shortestPath[j]])
    i += 1
    j += 1
  }

  const finalRates = shortestPathRates.map((x) => {
    x *= -1
    return Math.floor(Math.exp(x))
  })

  let profit = getUserAmount()
  for (rate of finalRates) {
    profit *= rate
  }

  shortestPathNames = []

  for (i of shortestPath) {
    shortestPathNames.push(CURRENCIES[i])
  }

  console.log(shortestPathNames)

  let pathRates = arrayToObjectWithNames()



  draw(CURRENCIES, shortestPathNames, pathRates)


  let pathDisplay = `<p> The path taken was `
  for (let v of shortestPathNames) {
    pathDisplay += `${v} `
  }
  pathDisplay += '</p>'
  document.getElementById('displayPath').innerHTML = pathDisplay
  document.getElementById('displayToUser').innerHTML = `<p>You made ${profit} dollars, for a total of ${profit - getUserAmount()} dollars in profit!</p>`
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

// sets the user amount
// function setAmount(userAmount) {
//   constants['userAmount'] = userAmount
// }

// // sets the base currency
// function setBaseCurrency(baseCurrency) {
//   constants['baseCurrency'] = baseCurrency
// }