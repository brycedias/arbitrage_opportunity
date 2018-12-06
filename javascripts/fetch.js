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

//TODO:- Make more general
// Arrays to hold the exchange rates with the different currencies
let EUR_rates = []
let GBP_rates = [] 
let CAD_rates = []
let USD_rates = []
let JPY_rates = []

// rates array to hold all of the exchange rates in the correct order
let ratesArray = []

//Function to fetch the data from the API
function fetchData() {
  // iterates through each URL in the array of URLs
  for (let url of URLs) {
    // attemps to fetch the data from the URL provided
    fetch(url)
      // if successfully connected to the url, converts the data to JSON
      .then((resp) => {
        return resp.json()
      })
      // after converting the data to JSON, finds the base and exchange rates
      .then((data) => {
        const base = data.base
        const temprates = Object.values(data.rates)
        // returns the negative natural log of all the rates for the shortest path algorithm
        const rates = temprates.map((x) => {
          return -1 * Math.log(x)
        })

        // returns the 
        const result = Object.keys(rates).map((key) => {
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
  //determines if the array is finished i.e. the 
  arr = sortArray(arr)
  const ratesObject = arr.map((x) => {
    let obj = {}
    obj[CURRENCIES[arr.indexOf(x)]] = x
    return obj
  })
  return ratesObject
}

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
    if (exchangeRates[0] == 0) {
      tempArray[0] = exchangeRates
    } else if (exchangeRates[1] == 0) {
      tempArray[1] = exchangeRates
    } else if (exchangeRates[2] == 0) {
      tempArray[2] = exchangeRates
    } else if (exchangeRates[3] == 0) {
      tempArray[3] = exchangeRates
    } else if (exchangeRates[4] == 0) {
      tempArray[4] = exchangeRates
    }
  }

  return tempArray
}