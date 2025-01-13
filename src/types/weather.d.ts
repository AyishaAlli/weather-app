export interface Forecast {
  date: string;
  temperature: number;
  icon: string;
}

export interface CurrentWeather {
  name: string;
  sunrise: string;
  sunset: string;
  temperature: number;
  minTemp: number;
  maxTemp: number;
  description: string;
  icon: string;
  pressure: number;
  humidity: number;
  visibility: number;
  ExtraWeatherInfo: ExtraWeatherInfo;
}

export interface WeatherData {
  currentData: CurrentWeather;
  forecastData: Forecast[];
}

export interface ExtraWeatherInfo {
  feelsLike: number;
}

export interface GeolocationData {
  longitude: number;
  latitude: number;
}
