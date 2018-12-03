document.getElementById('start-button').addEventListener("click", start)

//function to start the application and retrieve the exchange rates data
function start() {
  // adds a spinner to the page to indicate to the user that the page is loading
  // document.getElementById('cy').classList.remove('hidden')
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
  // document.getElementById('cy').classList.add('hidden')
  // console.log('%cIn Main Function', 'color: green; font-weight: bold;')
  // console.log(rates, currencies)

  let allRatesArray = []
  for (let i in currencies) {
    let tempArray = Object.values(rates[i])
    allRatesArray.push(tempArray)
  }
  // console.log(allRatesArray)
  const ratesObject = arrayToObject()

  // function arrayToObject() {
  //   let obj = {
  //     EUR: {
  //       EUR: 1,
  //       GBP: allRatesArray[0][0][1],
  //       CAD: allRatesArray[0][0][2],
  //       USD: allRatesArray[0][0][3],
  //       JPY: allRatesArray[0][0][4],
  //     },
  //     GBP: {
  //       EUR: allRatesArray[1][0][0],
  //       GBP: 1,
  //       CAD: allRatesArray[1][0][2],
  //       USD: allRatesArray[1][0][3],
  //       JPY: allRatesArray[1][0][4],
  //     },
  //     CAD: {
  //       EUR: allRatesArray[2][0][0],
  //       GBP: allRatesArray[2][0][1],
  //       CAD: 1,
  //       USD: allRatesArray[2][0][3],
  //       JPY: allRatesArray[2][0][4],
  //     },
  //     USD: {
  //       EUR: allRatesArray[3][0][0],
  //       GBP: allRatesArray[3][0][1],
  //       CAD: allRatesArray[3][0][2],
  //       USD: 1,
  //       JPY: allRatesArray[3][0][4],
  //     },
  //     JPY: {
  //       EUR: allRatesArray[4][0][0],
  //       GBP: allRatesArray[4][0][1],
  //       CAD: allRatesArray[4][0][2],
  //       USD: allRatesArray[4][0][3],
  //       JPY: 1,
  //     },
  //   }
  //   return obj
  // }

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

  console.log('rates object, line 77')
  console.log(ratesObject)
  // console.log('rate of usd -> gbp', ratesObject['USD']['GBP'])
  console.log('rate of eur -> usd', ratesObject[0][3])
  let graph = new Graph(currencies.length, ratesObject, currencies)
  debugger
  floydWarshall(graph)
}

// retrieves the base currency from the user
function getBaseCurrency() {
  let e = document.getElementById('baseCurrency')
  let baseCurrency = e.value
  console.log(baseCurrency)
  return baseCurrency
}

// getter and setter methods
// retrieves the monetary amount from the user
function getUserAmount() {
  let userAmount = document.getElementById('userAmount').value
  console.log(userAmount)
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