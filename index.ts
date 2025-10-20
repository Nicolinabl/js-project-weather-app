const weatherURL = `https://opendata-download-metfcst.smhi.se/api/category/snow1g/version/1/geotype/point/lon/16.158/lat/58.5812/data.json?parameters=air_temperature,symbol_code`

// interface 1 top info

// interface 2 advice message part

// interface 3 weekly temps

//Dom selectors
const topInfoContainer = document.getElementById("topInfoContainer") as HTMLSectionElement
const adviceContainer = document.getElementById("adviceSection")

interface TodayWeatherData {
  condition: number,
  airTemp: number
}
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

  } catch (error) {
    console.log("catched and error")
  }
}



const todayForecast = () => {
  // const timeNow = new Date() /* <-- gets current time. Next step: show data from the timeSeries closest to current time instead of always showing timeSeries[0]. Very hard..... */

  todayWeather = {
    condition: data.timeSeries[2].data.symbol_code,
    airTemp: data.timeSeries[2].data.air_temperature
  }

  topInfoContainer.innerHTML = `
        <div class="top-info">
          <p id="topCondition">${todayWeather.condition}</p>
          <hr>
          <p id="topTemp">${todayWeather.airTemp}&deg;</p>
        </div>
  `
  if (data.symbol_code === 6) {

  }
  showMessage(todayWeather, adviceContainer)
}

const showMessage = (data: TodayWeatherData, adviceContainer: HTMLElement): void => {
  adviceContainer.innerHTML = ``

  if ((data.condition <= 2) && data.airTemp >= 20) {
    adviceContainer.innerHTML = `
    <h1>get your sunnies on. stockholm is amazing</h1>`
  } else if ((data.condition >= 3 && data.condition <= 6) && (data.airTemp >= 15 && data.airTemp < 20)) {
    adviceContainer.innerHTML = `
    <h1>it's a bit cloudy but warm. a nice day for a walk in stockholm</h1>`
  } else {
    adviceContainer.innerHTML = `
    <h1>stay inside and code some more</h1>`
  }
}
fetchData()

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