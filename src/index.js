import "./styles/general.css";
import "./styles/header.css";
import "./styles/main.css";
import { fetchData } from "./getWeatherData";

let searchBtn = document.getElementById("search-button");
let searchInput = document.getElementById("search");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetchData(searchInput.value);
});
