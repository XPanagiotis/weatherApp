"use strict";

export default function weatherData(data) {
  //get the day name of the date
  function findDay(date) {
    const formatedDate = new Date(date);

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const getDayOfWeek = days[formatedDate.getDay()].slice(0, 3);
    return getDayOfWeek;
  }

  //create instances for daily data
  function DailyWeatherData(data) {
    return {
      date: data.date,
      day: findDay(data.date),
      icon: data.day.condition.icon,
      chanceOfRain: data.day.daily_chance_of_rain,
      celciusKmhData: {
        avgTemprature: data.day.avgtemp_c,
        wind: data.day.maxwind_kph,
      },
      fahrenheitMphData: {
        avgTemprature: data.day.avgtemp_f,
        wind: data.day.maxwind_mph,
      },
    };
  }

  //create instances for hourly data
  function HourlyWeatherData(data) {
    //get the object inside the array
    data = data[0];
    return {
      time: data.time.split(" ")[1],
      icon: data.condition.icon,
      chanceOfRain: data.chance_of_rain,
      celciusKmhData: {
        avgTemprature: data.temp_c,
        wind: data.wind_kph,
      },
      fahrenheitMphData: {
        avgTemprature: data.temp_f,
        wind: data.wind_mph,
      },
    };
  }

  const location = {
    country: data.location.country,
    city: data.location.name,
    lastUpdate: data.location.localtime.split(" ")[1],
  };

  const currentWeather = {
    cloud: data.current.cloud,
    humidity: data.current.humidity,
    mindDir: data.current.wind_dir.slice(-2),
    text: data.current.condition.text,
    icon: data.current.condition.icon,
    chanceOfRain: data.forecast.forecastday[0].day.daily_chance_of_rain,
    celciusKmhData: {
      feelsLike: data.current.feelslike_c,
      temprature: data.current.temp_c,
      visibility: data.current.vis_km,
      wind: data.current.wind_kph,
    },
    fahrenheitMphData: {
      feelsLike: data.current.feelslike_f,
      temprature: data.current.temp_f,
      visibility: data.current.vis_miles,
      wind: data.current.wind_mph,
    },
  };

  //we create an array that will contain the daily forecast
  const dailyForecast = new Array();

  //for each if the next 5 days we create an object for the weather information of this day
  data.forecast.forecastday.forEach((day) => {
    dailyForecast.push(new DailyWeatherData(day));
  });

  const hourlyForecast = new Array();

  //get the next 5 checkpoints after the last update
  const checkPointsToShow = getHourlyForecatData(
    data.forecast.forecastday,
    location.lastUpdate
  );
  checkPointsToShow.forEach((checkPoint) =>
    hourlyForecast.push(new HourlyWeatherData(checkPoint))
  );

  return { location, currentWeather, dailyForecast, hourlyForecast };
}

function getHourlyForecatData(data, now) {
  // Get the hour of the last update
  now = parseInt(now.split(":")[0]);

  const checkPointsToShow = _createHourlyForecast(now);
  const dataToShow = _getCheckpointData(data, checkPointsToShow, now);
  return dataToShow;

  //create an array with the checkpoints of the hourly forecast.
  function _createHourlyForecast(now) {
    const timeCheckPoints = [2, 7, 12, 17, 22]; //the checkPoints we will check

    const checkPointsToShow = [];

    let i = 0;
    while (checkPointsToShow.length < 5) {
      if (
        timeCheckPoints[i] > now ||
        (checkPointsToShow.length > 0 &&
          timeCheckPoints[i] < checkPointsToShow[0])
      ) {
        checkPointsToShow.push(timeCheckPoints[i]);
      }
      // Cycle through the checkpoints array
      i = (i + 1) % timeCheckPoints.length;
    }

    return checkPointsToShow;
  }

  //get the hourly data for each checkPoint
  function _getCheckpointData(daysData, checkPoints, now) {
    const dataToShow = new Array();

    checkPoints.forEach((checkPoint) => {
      //if the check  Point is in this day we get the data from today
      //else we get the data from the next day
      if (now < checkPoint) {
        dataToShow.push(
          daysData[0].hour.filter(
            (hour) => daysData[0].hour.indexOf(hour) === checkPoint
          )
        );
      } else {
        dataToShow.push(
          daysData[1].hour.filter(
            (hour) => daysData[1].hour.indexOf(hour) === checkPoint
          )
        );
      }
    });

    return dataToShow;
  }
}
