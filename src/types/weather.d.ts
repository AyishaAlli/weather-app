export interface Forecast {
  date: string;
  temperature: number;
  icon?: string;
}
export interface WeatherData {
  cityName: string;
  temperature: number;
  sunrise: string;
  sunset: string;
  icon: string;
  forecast: Forecast[];
}

export interface Coordinates {
  lat: number;
  lng: number;
  city_name: string;
}

// export interface WeatherActionTypes {
//   GET_WEATHER: {
//     type: "GET_WEATHER";
//     payload: WeatherData;
//   };
//   SET_ERROR: {
//     type: "SET_ERROR";
//     payload: string | null;
//   };
// }

// export type WeatherAction = WeatherActionTypes[keyof WeatherActionTypes];

// export interface WeatherState {
//   weatherData: WeatherData | null;
//   error: string | null;
// }
