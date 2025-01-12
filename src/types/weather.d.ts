export interface Forecast {
  date: string;
  temperature: number;
  icon: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
  city_name: string;
}

export interface WeatherData {
  cityName: string;
  temperature: number;
  humidity: number;
  pressure: string;
  visibility: string;
  sunrise: string;
  sunset: string;
  icon: string;
  description: string;
  forecast: Forecast[];
}
