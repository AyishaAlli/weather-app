export interface Forecast {
  date: string;
  temperature: number;
  icon?: string;
}
export interface WeatherData {
  cityName: string;
  temperature: number;
  humidty: number;
  pressure: number;
  visibility: number;
  sunrise: string;
  sunset: string;
  icon: string;
  description: string;
  forecast: Forecast[];
}

export interface Coordinates {
  lat: number;
  lng: number;
  city_name: string;
}
