import "./styles/general.css";
import "./styles/header.css";
import "./styles/main.css";
import { fetchData } from "./getWeatherData";
import { changeMetricsAnimation } from "./view/changeMetricsAnimation";
import weatherData from "./weatherForecast/weatherData";

let searchBtn = document.getElementById("search-button");
let searchInput = document.getElementById("search");

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  //fetch the weather data
  const response = await fetchData(searchInput.value);

  //create an object with the data we want to display
  const weather = weatherData(response);
  console.log(weather);
});

document
  .getElementById("toggleButton")
  .addEventListener("click", changeMetricsAnimation);
