import { useEffect, useState } from "react";
import fetchWeatherData from "../../services/meteomatics";

const CurrentDaySection = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    sunrise: 0,
    sunset: 0,
    icon: "",
  });

  const time = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const london = async () => {
    const now = new Date().toISOString().split(".")[0] + "Z";

    const latitude = 51.5074;
    const longitude = -0.1278;
    try {
      const url = `${now}/t_2m:C,sunrise:dn,sunset:dn,weather_symbol_1h:idx/${latitude},${longitude}/json?model=mix`;

      const response = await fetchWeatherData(url);
      console.log(response.data[3]);
      setWeatherData({
        temperature: Math.ceil(response.data[0].coordinates[0].dates[0].value),
        sunrise: response.data[1].coordinates[0].dates[0].value,
        sunset: response.data[2].coordinates[0].dates[0].value,
        icon: "",
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  useEffect(() => {
    london();
  }, []);

  const decimalToTime = (decimal: number | undefined): string => {
    if (decimal === undefined) return "N/A";
    const referenceDate = new Date("1900-01-01T00:00:00Z");
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const date = new Date(
      referenceDate.getTime() + decimal * millisecondsInDay
    );
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sunrise = decimalToTime(weatherData.sunrise);
  const sunset = decimalToTime(weatherData.sunset);

  return (
    <div className="bg-[#370552] p-4 rounded-md flex flex-col justify-between">
      <div>
        <div className="text-center text-white text-6xl px-4 py-1 rounded-md mb-4 block md:hidden">
          London
        </div>
        <div className="text-center bg-white text-black px-4 py-1 rounded-full mb-4  md:w-20 md:float-end">
          {time}
        </div>
      </div>
      <div className="text-9xl font-bold mt-4 self-center text-white">
        {weatherData.temperature}°c
      </div>
      <div className="self-center">ICON</div>
      <div className="space-y-2 mt-4 items-center">
        <div className="bg-purple-500 p-4 rounded-md">Sunrise: {sunrise}</div>
        <div className="bg-purple-500 p-4 rounded-md">Sunset: {sunset}</div>
      </div>
    </div>
  );
};

export default CurrentDaySection;
