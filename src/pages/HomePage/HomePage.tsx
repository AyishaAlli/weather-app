import CurrentDaySection from "../../components/CurrentDaySection/CurrentDaySection";
import { WeeklyForecast } from "../../components/WeeklyForecast/WeeklyForecast";
import { OtherCitiesWeather } from "../../components/OtherCities/OtherCities";
import NavBar from "../../components/NavBar/NavBar";
import { useState } from "react";

import useGeoLocation from "../../hooks/useGeoLocation";
import useGetWeatherData from "../../hooks/useGetWeatherData";

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: geoLocationData, loading, error } = useGeoLocation();
  const { data: weatherData, isLoading: weatherDataLoading } =
    useGetWeatherData(geoLocationData, searchQuery);

  if (loading || weatherDataLoading) {
    return <p>loading....</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {weatherData?.currentData ? (
        <div className="h-screen flex flex-col">
          <NavBar
            onSearch={setSearchQuery}
            cityName={weatherData?.currentData?.name}
          />
          <div className="flex-grow flex flex-col md:flex-row m-4 gap-4">
            <CurrentDaySection data={weatherData.currentData} />
            <div className="flex flex-col flex-1 gap-4">
              <div className="md:flex-[1.5]">
                <WeeklyForecast data={weatherData?.forecastData} />
              </div>
              <h2 className="text-3xl">Other Cities</h2>
              <div className="flex-1">
                <OtherCitiesWeather />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HomePage;
