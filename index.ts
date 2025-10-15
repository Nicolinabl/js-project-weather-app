const weatherURL = `https://opendata-download-metfcst.smhi.se/api/category/snow1g/version/1/geotype/point/lon/16.158/lat/58.5812/data.json`

let data = [] /*Look into this */

const fetchData = async () => {
  try {
    const response = await fetch(weatherURL)
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    data = await response.json()
    console.log(data)


  } catch (error) {
    console.log("catched and error")
  }

}

fetchData()







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