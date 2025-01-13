export interface Forecast {
  date: string;
  temperature: number;
  icon: string;
}

interface CurrentWeather {
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
}

interface WeatherData {
  currentData: CurrentWeather;
  forecastData: Forecast[];
}

export interface GeolocationData {
  longitude: number;
  latitude: number;
}
