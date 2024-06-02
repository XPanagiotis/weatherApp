export const fetchData = async function fetchData(location) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=cf1f0970fc5e4eddb25132935242905&q=${location}&days=5`,
    { mode: "cors" }
  );
  let data = await response.json();
  console.log(data);
};
