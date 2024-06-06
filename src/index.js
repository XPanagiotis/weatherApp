import "./styles/general.css";
import "./styles/header.css";
import "./styles/main.css";
import { fetchData } from "./getWeatherData";
import { changeUnitAnimation } from "./view/changeUnitAnimation";
import { renderWeatherCard } from "./view/renderWeatherCards";
import { displayWeather, displayUnitData } from "./controller/displayWeather";
import { events } from "./controller/pubSubPattern";
import { displayHourlyWeather } from "./controller/displayHourlyWeather";
import { displayDailylyWeather } from "./controller/pubSubPattern";
import { setUnit } from "./controller/setUnit";
import weatherData from "./weatherForecast/weatherData";

//cash DOM
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search");
const hourlyForecast = document.getElementById("hourly-forecast");
const dailyForecast = document.getElementById("daily-forecast");
const toggleButton = document.getElementById("toggleButton");

//bind events
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  //fetch the weather data
  const response = await fetchData(searchInput.value);

  //create an object with the data we want to display
  const weather = weatherData(response);
  displayWeather(weather);
  displayUnitData(weather, toggleButton.dataset.unit);
  displayHourlyWeather(weather.hourlyForecast, toggleButton.dataset.unit);
  setUnit(toggleButton.dataset.unit);

  //Change Units
  events.on("changeUnit", () => {
    setUnit(toggleButton.dataset.unit);
    displayUnitData(weather, toggleButton.dataset.unit);
    displayHourlyWeather(weather.hourlyForecast, toggleButton.dataset.unit);
  });
  console.log(weather);
});

document.getElementById("toggleButton").addEventListener("click", () => {
  changeUnitAnimation();
  events.emit("changeUnit");
});

renderWeatherCard();
