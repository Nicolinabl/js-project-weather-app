"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const weatherURL = `https://opendata-download-metfcst.smhi.se/api/category/snow1g/version/1/geotype/point/lon/16.158/lat/58.5812/data.json?parameters=air_temperature,symbol_code`;
// interface 1 top info
// interface 2 advice message part
// interface 3 weekly temps
//Dom selectors
const topInfoContainer = document.getElementById("topInfoContainer");
let data; /*Look into this */
let todayWeather;
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(weatherURL);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        data = yield response.json();
        console.log(data);
        todayForecast(data);
    }
    catch (error) {
        console.log("catched and error");
    }
});
fetchData();
const todayForecast = () => {
    // clear html
    todayWeather = {
        condition: data.timeSeries[0].data.symbol_code,
        airTemp: data.timeSeries[0].data.air_temperature
    };
    topInfoContainer.innerHTML = `
        <div class="top-info">
          <p id="topCondition">${todayWeather.condition}</p>
          <hr>
          <p id="topTemp">${todayWeather.airTemp}&deg;</p>
        </div>
  `;
    if (data.symbol_code === 6) {
    }
};
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
