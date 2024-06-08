export const fetchData = async function fetchData(location) {
  if (!location || location.trim() === "") {
    return { error: { message: "Please enter a valid location." } };
  }

  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=cf1f0970fc5e4eddb25132935242905&q=${location}&days=5`,
      { mode: "cors" }
    );

    //handle different errors
    if (response.status == "400") {
      return { error: { code: 1006, message: "No matching location found." } };
    } else if (response.ok) {
      let data = await response.json();
      return data;
    } else if (response.status == "403") {
      return { error: { code: 2008, message: "API key has been disabled." } };
    } else {
      return { error: { message: "Something went wrong" } };
    }
  } catch (err) {
    console.error("Fetching weather data failed:", err.message);
    return { error: err.message };
  }
};
