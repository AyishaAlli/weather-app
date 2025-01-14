export interface Forecast {
  date: number;
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
  minTemp: number;
  maxTemp: number;
  feelsLike: number;
  windSpeed: number;
  groundLevel: number | "N/A";
  seaLevel: number | "N/A";
}

export interface WeatherIconData {
  code: string;
  image: string;
}

export interface GeolocationData {
  longitude: number;
  latitude: number;
}
