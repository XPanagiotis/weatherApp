import { createDOMElement } from "../domHealperFunctions/createElement";
import { createImage } from "../domHealperFunctions/createImage";

//Images
import titleImage from "../assets/city-variant-outline.svg";
import reloadIcon from "../assets/reload.svg";
import rainImage from "../assets/chance-of-rain.svg";
import windImage from "../assets/wind.svg";

export const renderWeatherCard = function () {
  const cardWrapper = createDOMElement(
    "section",
    "weather-cards-wrapper",
    "",
    "weather-cards-wrapper"
  );

  const title = createDOMElement("h3", "title");
  title.appendChild(createImage(titleImage));
  title.appendChild(createDOMElement("span", "", "", "location"));

  const weatherCard = createDOMElement("div");

  //current weather card
  const currentWeatherCard = createDOMElement("div", "current-weather-card");

  //grid item 1
  const gridItem1 = createDOMElement("div", "grid-item1");

  const currentWeatherWrapper = createDOMElement(
    "div",
    "current-weather-wrapper"
  );
  currentWeatherWrapper.appendChild(
    createDOMElement("h3", "", "Current Weahter")
  );
  currentWeatherWrapper.appendChild(
    createDOMElement("span", "", "", "last-update")
  );
  gridItem1.appendChild(currentWeatherWrapper);
  gridItem1.appendChild(createImage(reloadIcon, "icon", "reload-icon"));

  //grid item 2
  const gridItem2 = createDOMElement("div", "grid-item2");
  const tempIconWrapper = createDOMElement("div", "temp-icon-wrapper");

  tempIconWrapper.appendChild(createImage("", "icon", "weather-icon"));
  const temp = createDOMElement("div");
  temp.appendChild(createDOMElement("h1", "", "", "current-temprature"));
  temp.appendChild(createDOMElement("h1", "", "", "temp-unit"));

  const minMaxTemp = createDOMElement("div");

  const minTempDiv = document.createElement("div");
  minTempDiv.innerHTML = `Min temp: <span id="min-temp"></span><span id="temp-unit"></span>`;

  const maxTempDiv = document.createElement("div");
  maxTempDiv.innerHTML = `Max temp: <span id="max-temp"></span><span id="temp-unit"></span>`;

  minMaxTemp.appendChild(minTempDiv);
  minMaxTemp.appendChild(maxTempDiv);

  tempIconWrapper.appendChild(temp);
  gridItem2.appendChild(tempIconWrapper);
  gridItem2.appendChild(minMaxTemp);

  //grid item 3
  const gridItem3 = createDOMElement("div", "grid-item3");
  gridItem3.appendChild(createDOMElement("h4", "", "", "sky-visibility"));

  const feelsLikeDiv = createDOMElement("div");
  feelsLikeDiv.innerHTML = `Feels like: <span id="feels-like"><span id="temp-unit"></span>`;
  gridItem3.appendChild(feelsLikeDiv);

  //grid item 4
  const gridItem4 = createDOMElement("div", "grid-item4");
  const windContainer = createDOMElement("div");
  windContainer.appendChild(createDOMElement("h4", "", "Wind"));

  const windDir = createDOMElement("div");
  windDir.appendChild(createImage("", "", "wind-direction"));
  const wind = createDOMElement("p");
  wind.innerHTML = `<span id="wind"></span> <span id="wind-unit"></span>`;
  windDir.appendChild(wind);
  windContainer.appendChild(windDir);

  const chanceOfRain = createDOMElement("div");
  chanceOfRain.appendChild(createDOMElement("h4", "", "Chance of rain"));
  chanceOfRain.appendChild(
    createDOMElement("p", "", "", "current-chance-of-rain")
  );

  const humidity = createDOMElement("div");
  humidity.appendChild(createDOMElement("h4", "", "Humidity"));
  humidity.appendChild(createDOMElement("p", "", "", "current-humidity"));

  const visibilityContainer = createDOMElement("div");
  visibilityContainer.appendChild(createDOMElement("h4", "", "Visibility"));
  const visibility = createDOMElement("p");
  visibility.innerHTML = `<span id="current-visibility"></span> <span id="distance-unit"></span>`;
  visibilityContainer.appendChild(visibility);

  const pressure = createDOMElement("div");
  pressure.appendChild(createDOMElement("h4", "", "Pressure"));
  pressure.appendChild(createDOMElement("p", "", "", "current-pressure"));

  gridItem4.appendChild(windContainer);
  gridItem4.appendChild(chanceOfRain);
  gridItem4.appendChild(humidity);
  gridItem4.appendChild(visibilityContainer);
  gridItem4.appendChild(pressure);

  currentWeatherCard.appendChild(gridItem1);
  currentWeatherCard.appendChild(gridItem2);
  currentWeatherCard.appendChild(gridItem3);
  currentWeatherCard.appendChild(gridItem4);

  weatherCard.appendChild(currentWeatherCard);

  //forecast container
  const forecastContainer = createDOMElement("div", "forecast-container");

  //grid item5
  const gridItem5 = createDOMElement("div", "grid-item5");
  const forecastType = createDOMElement("div");
  forecastType.appendChild(
    createDOMElement("p", "", "Hourly", "hourly-forecast")
  );
  forecastType.appendChild(
    createDOMElement("p", "", "Daily", "daily-forecast")
  );

  gridItem5.appendChild(forecastType);
  gridItem5.appendChild(createDOMElement("p", "", "Forecast"));

  //grid item6
  const gridItem6 = createDOMElement("div", "grid-item6");

  for (let i = 0; i < 5; i++) {
    gridItem6.appendChild(createForecast());
  }

  forecastContainer.appendChild(gridItem5);
  forecastContainer.appendChild(gridItem6);

  cardWrapper.appendChild(title);
  cardWrapper.appendChild(weatherCard);
  cardWrapper.appendChild(forecastContainer);
  document.querySelector("main").appendChild(cardWrapper);
};

function createForecast() {
  const container = createDOMElement("div", "", "", "forecast-container");

  container.appendChild(createDOMElement("p", "", "", "day-time"));

  const forecast = createDOMElement("div", "forecast");

  const tempIcon = createDOMElement("div");
  tempIcon.appendChild(createImage("", "icon", "forecastweather-icon"));

  const temp = document.createElement("p");
  temp.innerHTML = `<span id="temp"></span></span><span id="temp-unit">`;

  const chanceOfRainContainer = createDOMElement("div");
  chanceOfRainContainer.appendChild(createImage(rainImage, "icon"));
  const chanceOfRain = createDOMElement("p");
  chanceOfRain.innerHTML = '<span id="forecast-chance-of-rain"></span>%';
  chanceOfRainContainer.appendChild(chanceOfRain);

  const windContainer = createDOMElement("div");
  windContainer.appendChild(createImage(windImage, "icon"));
  const wind = createDOMElement("p");
  wind.innerHTML =
    '<span id="forecast-wind"></span><span id="wind-unit"></span>';
  windContainer.appendChild(wind);

  forecast.appendChild(tempIcon);
  forecast.appendChild(temp);
  forecast.appendChild(chanceOfRainContainer);
  forecast.appendChild(windContainer);

  container.appendChild(forecast);
  return container;
}
