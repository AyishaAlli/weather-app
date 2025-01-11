import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_GEOCODING_API_KEY;

const getCoordinates = async (city: string) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response) {
      const { lat, lng } = response.data.results[0].geometry.location;
      const city_name = response.data.results[0].formatted_address;

      return { lat, lng, city_name };
    } else {
      throw new Error("City not found");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

export default getCoordinates;
