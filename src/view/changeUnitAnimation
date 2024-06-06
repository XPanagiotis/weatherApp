export const changeUnitAnimation = function () {
  const unitC = document.querySelector(".unit-c");
  const unitF = document.querySelector(".unit-f");
  const toggleButton = document.getElementById("toggleButton");

  toggleButton.dataset.unit === "celciusKmhData"
    ? (toggleButton.dataset.unit = "fahrenheitMphData")
    : (toggleButton.dataset.unit = "celciusKmhData");

  if (unitC.classList.contains("selected")) {
    unitC.classList.remove("selected");
    unitC.classList.add("deselected");
    unitF.classList.remove("deselected");
    unitF.classList.add("selected");
  } else {
    unitC.classList.remove("deselected");
    unitC.classList.add("selected");
    unitF.classList.remove("selected");
    unitF.classList.add("deselected");
  }
};
