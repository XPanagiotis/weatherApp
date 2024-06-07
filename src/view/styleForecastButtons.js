export const styleForecastBtns = function () {
  const hourlyForecastBtn = document.querySelector("#hourly-forecast");
  const dailyForecastBtn = document.querySelector("#daily-forecast");

  if (hourlyForecastBtn.dataset.selected === "true") {
    hourlyForecastBtn.classList.add("selected");
    dailyForecastBtn.classList.remove("selected");
  } else {
    hourlyForecastBtn.classList.remove("selected");
    dailyForecastBtn.classList.add("selected");
  }
};
