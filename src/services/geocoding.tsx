import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_GEOCODING_API_KEY;

const getCoordinates = async (city: string) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    } else {
      throw new Error("City not found");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

export default getCoordinates;
