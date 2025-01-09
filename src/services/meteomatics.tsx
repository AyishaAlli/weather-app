import axios from "axios";

const BASE_URL = "https://api.meteomatics.com";

const username = import.meta.env.VITE_METEOMATICS_USERNAME;
const password = import.meta.env.VITE_METEOMATICS_PASSWORD;

const fetchWeatherData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      auth: {
        username,
        password,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export default fetchWeatherData;
