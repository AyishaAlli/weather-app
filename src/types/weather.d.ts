export interface WeatherData {
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
}

export interface WeatherActionTypes {
  GET_WEATHER: {
    type: "GET_WEATHER";
    payload: WeatherData;
  };
  SET_ERROR: {
    type: "SET_ERROR";
    payload: string | null;
  };
}

export type WeatherAction = WeatherActionTypes[keyof WeatherActionTypes];

export interface WeatherState {
  weatherData: WeatherData | null;
  error: string | null;
}
