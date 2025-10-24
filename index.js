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
//----------------------------------
// Dom selectors
//----------------------------------
const weatherContainer = document.getElementById("weatherContainer");
const rainContainer = document.getElementById("rainContainer");
const weeklyTempContainer = document.getElementById("weeklyTemp");
const adviceContainer = document.getElementById("adviceSection");
//----------------------------------
// API link
//----------------------------------
const weatherURL = `https://opendata-download-metfcst.smhi.se/api/category/snow1g/version/1/geotype/point/lon/16.158/lat/58.5812/data.json?parameters=air_temperature,symbol_code,probability_of_precipitation`;
const sunriseSunset = `https://api.sunrisesunset.io/json?lat=58.5812&lng=16.158`;
//----------------------------------
// Fetch API function
//----------------------------------
let data;
let todayWeather;
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(weatherURL);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        data = yield response.json();
        console.log(data);
        displayWeeklyTemps();
        todayForecast();
    }
    catch (error) {
        console.log("catch an error");
    }
});
let sunData;
const sunriseSunsetContainer = document.getElementById("sunriseSunsetContainer");
const fetchSunriseSunsetData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(sunriseSunset);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        sunData = yield response.json();
        console.log(sunData);
        displaySunTimes(sunData);
    }
    catch (error) {
        console.error("An error:", error);
    }
});
//----------------------------------
// Sunrise/sunset function
//----------------------------------
const displaySunTimes = (sunData) => {
    const sunrise = sunData.results.sunrise;
    const sunset = sunData.results.sunset;
    sunriseSunsetContainer.innerHTML = `
  <div class="top-info">
  <p id="topSunrise">Sunrise</p>
  <p id="sunriseTime">${sunrise}</p>
  </div>
  
  <div class="top-info">
  <p id="topSunset">sunset</p>
  <p id="sunsetTime">${sunset}</p>
  </div>
  `;
};
fetchSunriseSunsetData();
//Mapping codes and conditions:
const weatherSymbol = (code) => {
    const mapping = {
        1: "Clear sky",
        2: "Nearly clear",
        3: "Variable clouds",
        4: "Half cloudy sky",
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
    };
    return mapping[Math.round(code)] || "Unknown";
};
//----------------------------------
// Show todays forecast function
//----------------------------------
const todayForecast = () => {
    const current = data.timeSeries[0].data;
    const airTemp = current.air_temperature;
    const conditionCode = current.symbol_code;
    const conditionLabel = weatherSymbol(conditionCode);
    const rainData = current.probability_of_precipitation;
    const condition = weatherSymbol(data.timeSeries[0].data.symbol_code);
    todayWeather = {
        condition,
        airTemp,
        rainData
    };
    weatherContainer.innerHTML = `
  <div class="top-info">
  <p id="topCondition">${todayWeather.condition}</p>
  <hr>
  <p id="topTemp">${todayWeather.airTemp}&deg;</p>
  </div>
  `;
    rainContainer.innerHTML = `
  <div class="top-info">
  <p id="topRainData">Probability of precipitation: ${todayWeather.rainData}%</p>
  </div>`;
    showMessage(todayWeather, adviceContainer, weeklyTempContainer);
};
//----------------------------------
// Function for showing advice message, symbol and diffrent styling depending on weather
//----------------------------------
const showMessage = (data, adviceContainer, weeklyTempContainer) => {
    const hrElement = document.querySelector("hr");
    if (!weeklyTempContainer || !adviceContainer)
        return;
    adviceContainer.innerHTML = ``;
    const condition = data.condition.toLowerCase();
    // --- SUNNY ---
    if (condition.includes("clear") ||
        condition.includes("nearly clear")) {
        document.body.style.backgroundColor = "#F7E9B9";
        document.body.style.color = "#2A5510";
        hrElement.style.borderColor = "#2A5510";
        adviceContainer.innerHTML = `
      <img class="advice-img" src="Group 7.png" alt="sunny icon">
      <h1>Get your sunglasses on. Stockholm is amazing!</h1>`;
    }
    // --- CLOUDY / OVERCAST / FOG ---
    else if (condition.includes("cloud") ||
        condition.includes("overcast") ||
        condition.includes("fog") ||
        condition.includes("variable") ||
        condition.includes("half cloudy sky")) {
        document.body.style.backgroundColor = "#FFFFFF";
        document.body.style.color = "#F47775";
        hrElement.style.borderColor = "#F47775";
        adviceContainer.innerHTML = `
      <img class="advice-img" src="./Figma designs for students (2)/Group 8@2x.png" alt="cloudy icon">
      <h1>Light a fire and get cosy. Stockholm is looking grey today.</h1>`;
    }
    // --- RAIN / SLEET ---
    else if (condition.includes("rain") ||
        condition.includes("sleet") ||
        condition.includes("shower")) {
        document.body.style.backgroundColor = "#BDE8FA";
        document.body.style.color = "#164A68";
        hrElement.style.borderColor = "#164A68";
        adviceContainer.innerHTML = `
      <img class="advice-img" src="./Figma designs for students (1)/noun_Umbrella_2030530@2x.png" alt="rainy icon">
      <h1>Don't forget your umbrella. It's wet in Stockholm today.</h1>`;
    }
    // --- SNOW ---
    else if (condition.includes("snow")) {
        document.body.style.backgroundColor = "#EAF4FF";
        document.body.style.color = "#1B3A57";
        hrElement.style.borderColor = "#1B3A57";
        adviceContainer.innerHTML = `
      <img class="advice-img" src="./snow-icon.png" alt="snow icon">
      <h1>Wrap up warm - it's snowing in Stockholm!</h1>`;
    }
    // --- THUNDER / STORM ---
    else if (condition.includes("thunder") ||
        condition.includes("storm")) {
        document.body.style.backgroundColor = "#B3B8C4";
        document.body.style.color = "#2A2A2A";
        hrElement.style.borderColor = "#2A2A2A";
        adviceContainer.innerHTML = `
      <img class="advice-img" src="./storm-icon.png" alt="storm icon">
      <h1>Stay safe - there's a storm in Stockholm.</h1>`;
    }
    // --- FALLBACK ---
    else {
        document.body.style.backgroundColor = "#EEE";
        document.body.style.color = "#333";
        hrElement.style.borderColor = "#000";
        adviceContainer.innerHTML = `<h1>Anything could happen, you better be prepared!</h1>`;
    }
};
fetchData();
//----------------------------------
// Display weekly temps bottom part function
//----------------------------------
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; /* Array of weekdays. To be used for displaying weekdays dynamically */
let weatherForecast; /* Defining weatherForecast object */
const displayWeeklyTemps = () => {
    const rotateWeekdays = () => {
        const today = new Date(); /* Gets today */
        const todayIndex = today.getDay(); /* Gets index of day. 0 = sunday */
        const rotated = weekDays.slice(todayIndex).concat(weekDays.slice(0, todayIndex));
        return rotated;
    };
    const rotatedWeekdays = rotateWeekdays();
    weatherForecast = {
        firstDay: data.timeSeries[0].data.air_temperature,
        secondDay: data.timeSeries[25].data.air_temperature,
        thirdDay: data.timeSeries[49].data.air_temperature,
        fourthDay: data.timeSeries[55].data.air_temperature,
        fifthDay: data.timeSeries[59].data.air_temperature,
        sixthDay: data.timeSeries[63].data.air_temperature,
        seventhDay: data.timeSeries[67].data.air_temperature
    };
    const labels = rotatedWeekdays.map((day, i) => {
        if (i === 0)
            return "Today";
        return day;
    });
    weeklyTempContainer.innerHTML = `
      <div id="mondayTemp"> 
        <p>${labels[0]}</p>
        <p>${weatherForecast.firstDay}°</p>
      </div>

      <div id="tuesdayTemp">
        <p>${labels[1]}</p>
        <p>${weatherForecast.secondDay}°</p>
      </div>

      <div id="wednesdayTemp">
        <p>${labels[2]}</p>
        <p>${weatherForecast.thirdDay}°</p>
      </div>

      <div id="thursdayTemp">
        <p>${labels[3]}</p>
        <p>${weatherForecast.fourthDay}°</p>
      </div>

      <div id="fridayTemp">
        <p>${labels[4]}</p>
        <p>${weatherForecast.fifthDay}°</p>
      </div>

      <div id="saturdayTemp">
        <p>${labels[5]}</p>
        <p>${weatherForecast.sixthDay}°</p>
      </div>

      <div id="sundayTemp">
        <p>${labels[6]}</p>
        <p>${weatherForecast.seventhDay}°</p>
      </div>
  `;
};
