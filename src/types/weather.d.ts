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
  currentData: {
    name: string;
    sunrise: number;
    sunset: number;
    temprature: number;
    minTemp: number;
    maxTemp: number;
    description: string;
    icon: string;
    humidity: number;
    pressure: number;
    visibility: number;
  };
  forecastData: Forecast[];
}

export interface GeolocationData {
  longitude: number;
  latitude: number;
}
