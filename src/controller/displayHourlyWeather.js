export const displayHourlyWeather = function (forecast, unit) {
  const hourElements = document.querySelectorAll("#day-time");
  const iconElements = document.querySelectorAll("#forecastweather-icon");
  const tempratureElements = document.querySelectorAll("#temp");
  const rainElements = document.querySelectorAll("#forecast-chance-of-rain");
  const windElements = document.querySelectorAll("#forecast-wind");

  for (let i = 0; i < 5; i++) {
    hourElements[i].textContent = forecast[i].time;
    iconElements[i].src = `https:${forecast[i].icon}`;
    tempratureElements[i].textContent = forecast[i][unit].avgTemprature;
    rainElements[i].textContent = forecast[i].chanceOfRain;
    windElements[i].textContent = forecast[i][unit].wind;
  }
};
