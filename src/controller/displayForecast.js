import { styleForecastBtns } from "../view/styleForecastButtons";

export const displayForecast = function (weather, unit) {
  //cashe DOM
  const dateHourElements = document.querySelectorAll("#day-time");
  const iconElements = document.querySelectorAll("#forecastweather-icon");
  const tempratureElements = document.querySelectorAll("#temp");
  const rainElements = document.querySelectorAll("#forecast-chance-of-rain");
  const windElements = document.querySelectorAll("#forecast-wind");
  const hourlyForecastBtn = document.getElementById("hourly-forecast");
  const dailyForecastBtn = document.getElementById("daily-forecast");

  let key;
  hourlyForecastBtn.dataset.selected === "true"
    ? (key = "hourlyForecast")
    : (key = "dailyForecast");

  for (let i = 0; i < 5; i++) {
    if (key === "hourlyForecast") {
      dateHourElements[i].textContent = weather[key][i].time;
    } else {
      dateHourElements[i].textContent = weather[key][i].day;
    }
    iconElements[i].src = `https:${weather[key][i].icon}`;
    tempratureElements[i].textContent = weather[key][i][unit].avgTemprature;
    rainElements[i].textContent = weather[key][i].chanceOfRain;
    windElements[i].textContent = weather[key][i][unit].wind;
  }
};
