export class WeatherForecast {
  constructor() {
    (this.location = new Location()),
      (this.currentWeather = new CurrentWeather());
  }
}
