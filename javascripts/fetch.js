const EUR_URL = 'https://raw.githubusercontent.com/brycedias/arb_opp/master/sampleJSON/sample_EUR.json'
const GBP_URL = 'https://raw.githubusercontent.com/brycedias/arb_opp/master/sampleJSON/sample_GBP.json'
const CAD_URL = 'https://raw.githubusercontent.com/brycedias/arb_opp/master/sampleJSON/sample_CAD.json'
const USD_URL = 'https://raw.githubusercontent.com/brycedias/arb_opp/master/sampleJSON/sample_USD.json'
const JPY_URL = 'https://raw.githubusercontent.com/brycedias/arb_opp/master/sampleJSON/sample_JPY.json'

const URLs = [
  EUR_URL,
  GBP_URL,
  CAD_URL,
  USD_URL,
  JPY_URL
]

const CURRENCIES = ['EUR', 'GBP', 'CAD', 'USD', 'JPY']
// associates the currencies with their indicies to avoid confusion

//TODO:- make more general
let EUR_rates = []
let GBP_rates = [] 
let CAD_rates = []
let USD_rates = []
let JPY_rates = []

let ratesArray = []
// END TODO
function fetchData() {
  for (let url of URLs) {
    fetch(url)
      .then((resp) => {
        return resp.json()
      })
      .then((data) => {
        const base = data.base
        const temprates = Object.values(data.rates)
		//console.log('Original rates', temprates)
        const rates = temprates.map((x) => {
          if (x !== 1) {
            return -1 * Math.log(x)
          } else {
            return x
          }
        })
        // console.log(rates)
        const result = Object.keys(rates).map(function (key) {
          return rates[key]
        })

        pushRates(base, result)

        if (ratesArray.length == 5) {
          const ratesObject = finished(ratesArray)
          return ratesObject
        }
      })
      .then((ratesObject) => {
        if (ratesObject.length == 5) {
          main(ratesObject, CURRENCIES)
        }
      })
  }
}

function finished(arr) {
  // console.log('%cFinished!', 'color: red; font-weight: bold;')
  // console.log(arr)
  arr = sortArray(arr)
  const ratesObject = arr.map((x) => {
    // console.log(x)
    let obj = {}
    obj[CURRENCIES[arr.indexOf(x)]] = x
    return obj
  })
  // console.log('%cRates Object:', 'color: cyan; font-weight: bold;')
  // console.log(ratesObject)
  return ratesObject
}

//TODO:- make more general
function pushRates(base, exchanges) {
  switch (base) {
    case 'EUR':
      EUR_rates = exchanges
      ratesArray.push(EUR_rates)
      break
    case 'USD':
      USD_rates = exchanges
      ratesArray.push(USD_rates)
      break
    case 'GBP':
      GBP_rates = exchanges
      ratesArray.push(GBP_rates)
      break
    case 'JPY':
      JPY_rates = exchanges
      ratesArray.push(JPY_rates)
      break
    case 'CAD':
      CAD_rates = exchanges
      ratesArray.push(CAD_rates)
      break
  }
}

function sortArray(arr) {
  let tempArray = new Array(arr.length)
  for (let x = 0; x < arr.length; x++) {
    tempArray[x] = new Array(arr.length)
  }
  for (let exchangeRates of arr) {
    // console.log('%cExchange Rates', 'color:orange;')
    // console.log(exchangeRates)
    if (exchangeRates[0] == 1) {
      tempArray[0] = exchangeRates
    } else if (exchangeRates[1] == 1) {
      tempArray[1] = exchangeRates
    } else if (exchangeRates[2] == 1) {
      tempArray[2] = exchangeRates
    } else if (exchangeRates[3] == 1) {
      tempArray[3] = exchangeRates
    } else if (exchangeRates[4] == 1) {
      tempArray[4] = exchangeRates
    }
  }

  // console.log('%cTempArray', 'color: green; font-weight:bold;')
  // console.log(tempArray)
  return tempArray
}