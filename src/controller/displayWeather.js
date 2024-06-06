//wind direction icons
import n from "../assets/north.svg";
import nw from "../assets/north-west.svg";
import ne from "../assets/north-east.svg";
import s from "../assets/south.svg";
import sw from "../assets/south-west.svg";
import se from "../assets/south-east.svg";
import e from "../assets/east.svg";
import w from "../assets/west.svg";

export const displayWeather = function (data) {
  //set loacation
  document.getElementById(
    "location"
  ).textContent = `${data.location.city}, ${data.location.country}`;

  //set last update time
  document.getElementById("last-update").textContent = data.location.lastUpdate;

  //set current temprature and icon
  document.getElementById(
    "weather-icon"
  ).src = `https:${data.currentWeather.icon}`;

  //sky
  document.getElementById("sky-visibility").textContent =
    data.currentWeather.text;

  //set wind direction
  document.getElementById("wind-direction").src = setWindDir(
    data.currentWeather.windDir
  );

  //set chance of rain
  document.getElementById(
    "current-chance-of-rain"
  ).textContent = `${data.currentWeather.chanceOfRain}%`;

  //set Humidity
  document.getElementById(
    "current-humidity"
  ).textContent = `${data.currentWeather.humidity}%`;

  //set pressure
  document.getElementById(
    "current-pressure"
  ).textContent = `${data.currentWeather.pressure}mb`;
};

export const displayUnitData = function (data, unit) {
  //Unit data
  document.getElementById("current-temprature").textContent =
    data.currentWeather[unit].temprature;

  //set min max temprature
  document.getElementById("min-temp").textContent =
    data.currentWeather[unit].minTemprature;

  document.getElementById("max-temp").textContent =
    data.currentWeather[unit].maxTemprature;

  //set feels like
  document.getElementById("feels-like").textContent =
    data.currentWeather[unit].feelsLike;

  //set wind
  document.getElementById("wind").textContent = data.currentWeather[unit].wind;

  //set visibility
  document.getElementById("current-visibility").textContent =
    data.currentWeather[unit].visibility;
};

function setWindDir(windDir) {
  const windDirectionsIcons = {
    n: n,
    nw: nw,
    ne: ne,
    s: s,
    sw: sw,
    se: se,
    e: e,
    w: w,
  };

  for (const direction in windDirectionsIcons) {
    if (windDir.toLowerCase() == direction) {
      return windDirectionsIcons[direction];
    }
  }
}
