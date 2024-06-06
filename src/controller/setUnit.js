export const setUnit = function (unit) {
  const windElements = document.querySelectorAll("#wind-unit");
  const tempratureElements = document.querySelectorAll("#temp-unit");
  const distanceElements = document.querySelectorAll("#distance-unit");

  if (unit === "celciusKmhData") {
    windElements.forEach((el) => {
      el.textContent = "kph";
    });

    tempratureElements.forEach((el) => {
      el.textContent = "°C";
    });

    distanceElements.forEach((el) => {
      el.textContent = "km";
    });
  } else {
    windElements.forEach((el) => {
      el.textContent = "mph";
    });

    tempratureElements.forEach((el) => {
      el.textContent = "°F";
    });

    distanceElements.forEach((el) => {
      el.textContent = "miles";
    });
  }
};
