//----------------------------------
// Dom selectors
//----------------------------------
const topInfoContainer = document.getElementById("topInfoContainer") as HTMLElement
const weeklyTempContainer = document.getElementById("weeklyTemp") as HTMLElement /* Nicolina added this: dom selector for bottom section */


//----------------------------------
// API link
//----------------------------------
const weatherURL = `https://opendata-download-metfcst.smhi.se/api/category/snow1g/version/1/geotype/point/lon/16.158/lat/58.5812/data.json?parameters=air_temperature,symbol_code`


//----------------------------------
// Suggestions of interfaces:
//----------------------------------
// interface 1 top info
// interface 2 advice message part
// interface 3 weekly temps


//----------------------------------
// Fetch API function
//----------------------------------
let data: any /*Look into this */
let todayWeather: TodayWeatherData

const fetchData = async () => {
  try {
    const response = await fetch(weatherURL)
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    data = await response.json()
    console.log(data)

    todayForecast(data)
    displayWeeklyTemps() /* Nicolina added this. Calling function for weekly forecast */

  } catch (error) {
    console.log("catched and error")
  }
}

fetchData()

interface TodayWeatherData {
  condition: string, /* Look into this. condition is also number? */
  airTemp: number
}

//Mapping codes and conditions:

const weatherSymbol = (code: number): string => {
 const mapping: Record<number, string> = {
   1: "Clear sky",
    2: "Nearly clear",
    3: "Variable clouds",
    4: "Halfclear sky",
    5: "Cloudy",
    6: "Overcast",
    7: "Fog",
    8: "Light rain",
    9: "Moderate rain",
    10: "Heavy showers",
    11: "Thunderstorm",
    12: "Light sleet",
    13: "Moderate sleet",
    14: "Heavy sleet",
    15: "Light snow",
    16: "Moderate snow",
    17: "Heavy snow",
    18: "Light rain",
    19: "Moderate rain",
    20: "Heavy rain",
    21: "Thunder",
    22: "Light sleet",
    23: "Moderate sleet",
    24: "Heavy sleet",
    25: "Light snow",
    26: "Moderate snow",
    27: "Heavy snow"
 }
 return mapping[Math.round(code)] || "Unknown"
}


//----------------------------------
// Show todays forecast function
//----------------------------------
const todayForecast = (data: any) => {
  // const timeNow = new Date() /* <-- gets current time. Next step: show data from the timeSeries closest to current time instead of always showing timeSeries[0]. Very hard..... */

  const current = data.timeSeries[0].data
  
  const airTemp = current.air_temperature
  const conditionCode = current.symbol_code
  const conditionLabel = weatherSymbol(conditionCode)

  todayWeather = {
    condition: weatherSymbol(data.timeSeries[0].data.symbol_code),
    airTemp
  }

  topInfoContainer.innerHTML = `
        <div class="top-info">
          <p id="topCondition">${todayWeather.condition}</p>
          <hr>
          <p id="topTemp">${todayWeather.airTemp}&deg;</p>
        </div>
  `
  console.log("Raw symbol_code:", conditionCode);
  console.log("Converted condition:", conditionLabel);
 /*  if (data.symbol_code === 6) {
  } */
}


//----------------------------------
// Display weekly temps bottom part function
//----------------------------------
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] /* Array of weekdays. To be used for displaying weekdays dynamically */

interface WeatherForecastData { /* Interface for the weather forecasts */
  firstDay: number
  secondDay: number
  thirdDay: number
  fourthDay: number
  fifthDay: number
  sixthDay: number
  seventhDay: number
}

let weatherForecast: WeatherForecastData /* Defining weatherForecast object */

const displayWeeklyTemps = () => {

  const rotateWeekdays = () => { /* Accessing what today is and what index today has */
    const today = new Date()
    const todayIndex = today.getDay()
    for (let i = 0; i < weekDays.length; i++) {

    }
  }

  weatherForecast = { /* Selecting which timeSeries to use for each day */
    firstDay: data.timeSeries[0].data.air_temperature,
    secondDay: data.timeSeries[25].data.air_temperature,
    thirdDay: data.timeSeries[49].data.air_temperature,
    fourthDay: data.timeSeries[59].data.air_temperature,
    fifthDay: data.timeSeries[63].data.air_temperature,
    sixthDay: data.timeSeries[67].data.air_temperature,
    seventhDay: data.timeSeries[71].data.air_temperature
  }

  weeklyTempContainer.innerHTML = `
      <div id="mondayTemp">
        <p>Today</p>
        <p>${weatherForecast.firstDay}°</p>
      </div>

      <div id="tuesdayTemp">
        <p>tomorrow</p>
        <p>${weatherForecast.secondDay}°</p>
      </div>

      <div id="wednesdayTemp">
        <p>day after</p>
        <p>${weatherForecast.thirdDay}°</p>
      </div>

      <div id="thursdayTemp">
        <p>day after +1</p>
        <p>${weatherForecast.fourthDay}°</p>
      </div>

      <div id="fridayTemp">
        <p>day after +2</p>
        <p>${weatherForecast.fifthDay}°</p>
      </div>

      <div id="saturdayTemp">
        <p>day after +3</p>
        <p>${weatherForecast.sixthDay}°</p>
      </div>

      <div id="sundayTemp">
        <p>day after +4</p>
        <p>${weatherForecast.seventhDay}°</p>
      </div>
  `
} /* Next step figure out: 
- which timeSeries to use for each day?
- Average temp or lowest and highest? How find?
- How to loop through days and show current day on top?
*/

//test to get swedish local time 
const todaySwedishForecast = (data: any) => {
  const now = new Date()
  const currentHour = now.getHours()

  const entry = data.timeSeries.find((item: any) => {
    const forecastDate = new Date(item.validTime)
    return forecastDate.getHours() === currentHour
  }) ?? data.timeSeries[0]

  const forecastDate = new Date(entry.validTime)
  console.log("forecast time (swedish local", forecastDate.toString)
}


/*
const symbolMeanings: string[] = [
  "", // index 0 (unused, just a placeholder)
  "Clear sky ☀️",               // 1
  "Nearly clear sky 🌤",         // 2
  "Variable cloudiness ⛅",      // 3
  "Halfclear sky 🌥",            // 4
  "Cloudy sky ☁️",              // 5
  "Overcast ☁️",                // 6
  "Fog 🌫",                      // 7
  "Light rain showers 🌦",       // 8
  "Moderate rain showers 🌧",    // 9
  "Heavy rain showers 🌧🌧",     // 10
  "Thunderstorm ⛈",             // 11
  "Light sleet showers 🌨",      // 12
  "Moderate sleet showers 🌨",   // 13
  "Heavy sleet showers 🌨🌨",    // 14
  "Light snow showers ❄️",      // 15
  "Moderate snow showers ❄️❄️", // 16
  "Heavy snow showers ❄️❄️❄️",  // 17
  "Light rain 🌧",               // 18
  "Moderate rain 🌧",            // 19
  "Heavy rain 🌧🌧",             // 20
  "Thunder ⚡️",                 // 21
  "Light sleet 🌨",             // 22
  "Moderate sleet 🌨",          // 23
  "Heavy sleet 🌨🌨",            // 24
  "Light snowfall ❄️",          // 25
  "Moderate snowfall ❄️❄️",     // 26
  "Heavy snowfall ❄️❄️❄️"       // 27
];

function getCondition(symbolCode: number): string {
  return symbolMeanings[symbolCode] || "Unknown condition";
}

const conditionResponse = getCondition(symbolMeanings) */


// data.timeSeries[0].parameters.find(p => p.name === "t").values[0]


// https://opendata-download-metfcst.smhi.se/api/category/snow1g/version/1/air_temperature.json

// /api/category/snow1g/version/1/air_temperature/symbol_code.json

// /api/category/snow1g/version/1/parameter.json

// // jennies code
// interface currentWeatherData {
//   airTemp: number,
//   condition: string
// }

// let currentWeather: currentWeatherData

// const fetchWeather = async () => {
//   try {
//     const response = await fetch(weatherURL)

//     if (!response.ok) throw new Error(`HTTP error: ${response.status}`)

//     const data = await response.json()

//     // console.log('data', data)

//     // currentWeather = data.timeSeries[0].data

//     currentWeather = {
//       airTemp: data.timeSeries[0].data.air_temperature,
//       condition: data.timeSeries[0].data.symbol_code
//     }

//     console.log(data.timeSeries[0].data)

//   } catch (error) {
//     console.log(`caught an error, ${error}`)
//   }
// }

// fetchWeather()