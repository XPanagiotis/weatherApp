import "./styles/general.css";
import "./styles/header.css";
import "./styles/main.css";
import { fetchData } from "./getWeatherData";
import { changeUnitAnimation } from "./view/changeUnitAnimation.js";
import { renderWeatherCard } from "./view/renderWeatherCards";
import { displayWeather, displayUnitData } from "./controller/displayWeather";
import { events } from "./controller/pubSubPattern";
import { displayForecast } from "./controller/displayForecast";
import { setUnit } from "./controller/setUnit";
import { styleForecastBtns } from "./view/styleForecastButtons.js";
import weatherData from "./weatherForecast/weatherData";
import { handleErrors } from "./controller/handleErrors.js";
//cash DOM
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search");
const toggleButton = document.getElementById("toggleButton");

//load default forecast
startingPage();

//render DOM
renderWeatherCard();

//After renderinf the page we cashe the buttons we created
const hourlyForecastBtn = document.getElementById("hourly-forecast");
const dailyForecastBtn = document.getElementById("daily-forecast");
const reloadBtn = document.getElementById("reload-icon");
const loadingCard = document.querySelector(".loading-card");
const errorPage = document.getElementById("error-page");

hourlyForecastBtn.dataset.selected = "true";
dailyForecastBtn.dataset.selected = "false";

//bind events
searchBtn.addEventListener("click", handleSearch);

document.getElementById("toggleButton").addEventListener("click", () => {
  changeUnitAnimation();
  events.emit("changeUnit");
});

//load starting page function
async function startingPage() {
  try {
    //by default display Athens weather on page load
    const response = await fetchData("Athens");
    console.log(response);
    if (!response.error) {
      //create an object with the data we want to display
      const weather = weatherData(response);

      //display the weather data
      displayWeather(weather);
      displayUnitData(weather, toggleButton.dataset.unit);

      //by default we display hourly forecast
      displayForecast(weather, toggleButton.dataset.unit);
      styleForecastBtns();

      setUnit(toggleButton.dataset.unit);
      loadingCard.style.display = "none";

      //handle hourly forecast
      hourlyForecastBtn.addEventListener("click", () => {
        displayForecast(weather, toggleButton.dataset.unit);
        hourlyForecastBtn.dataset.selected = "true";
        dailyForecastBtn.dataset.selected = "false";
        styleForecastBtns();

        //remove the event listener
        hourlyForecastBtn.removeEventListener(
          "click",
          displayForecast(weather, toggleButton.dataset.unit)
        );
      });

      //handle daily forecast
      dailyForecastBtn.addEventListener("click", () => {
        displayForecast(weather, toggleButton.dataset.unit);
        dailyForecastBtn.dataset.selected = "true";
        hourlyForecastBtn.dataset.selected = "false";
        styleForecastBtns();

        //remove the event listener
        dailyForecastBtn.removeEventListener(
          "click",
          displayForecast(weather, toggleButton.dataset.unit)
        );
      });

      //Update the weather
      reloadBtn.addEventListener("click", startingPage);

      //Change Units
      events.on("changeUnit", () => {
        setUnit(toggleButton.dataset.unit);
        displayUnitData(weather, toggleButton.dataset.unit);
        displayForecast(weather, toggleButton.dataset.unit);
      });
    } else {
      loadingCard.style.display = "none";
      throw response.error;
    }
  } catch (error) {
    handleErrors(error);
  }
}

//handle forecast on search
async function handleSearch(e) {
  e.preventDefault();
  if (errorPage.style.display === "flex") {
    errorPage.style.display = "none";
  }
  loadingCard.style.display = "flex";

  try {
    //fetch the weather data
    const response = await fetchData(searchInput.value);
    if (!response.error) {
      //create an object with the data we want to display
      const weather = weatherData(response);

      displayWeather(weather);
      displayUnitData(weather, toggleButton.dataset.unit);

      //by default we display hourly forecast
      hourlyForecastBtn.dataset.selected = "true";
      dailyForecastBtn.dataset.selected = "false";
      displayForecast(weather, toggleButton.dataset.unit);

      setUnit(toggleButton.dataset.unit);
      loadingCard.style.display = "none";
      //Change Units
      events.on("changeUnit", () => {
        setUnit(toggleButton.dataset.unit);
        displayUnitData(weather, toggleButton.dataset.unit);
        displayForecast(weather, toggleButton.dataset.unit);
      });

      //Display Forecast
      events.on(
        "changeForecast",
        displayForecast(weather, toggleButton.dataset.unit)
      );
      reloadBtn.removeEventListener("click", startingPage);
      reloadBtn.addEventListener("click", handleSearch);
    } else {
      loadingCard.style.display = "none";
      throw response.error;
    }
  } catch (error) {
    handleErrors(error);
  }
}
