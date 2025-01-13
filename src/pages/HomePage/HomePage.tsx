import CurrentDaySection from "../../components/CurrentDay/CurrentDay";
import { WeeklyForecast } from "../../components/WeeklyForecast/WeeklyForecast";
import { OtherCitiesWeather } from "../../components/OtherCities/OtherCities";
import NavBar from "../../components/NavBar/NavBar";
import { useState } from "react";

import useGeoLocation from "../../hooks/useGeoLocation";
import useGetWeatherData from "../../hooks/useGetWeatherData";

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: geoLocationData, loading, error } = useGeoLocation();
  const {
    data: weatherData,
    isLoading: weatherDataLoading,
    error: weatherDataError,
  } = useGetWeatherData(geoLocationData, searchQuery);

  const isLoading = loading || weatherDataLoading;

  if (isLoading) {
    return <p>Loading weather data...</p>;
  }

  if (error || weatherDataError) {
    return <p>Error: {error?.message || weatherDataError?.message}</p>;
  }

  return (
    <>
      {weatherData?.currentData ? (
        <div className="h-screen flex flex-col">
          <NavBar
            onSearch={setSearchQuery}
            searchQueary={searchQuery}
            cityName={weatherData.currentData.name}
          />
          <div className="flex-grow flex flex-col md:flex-row m-4 gap-4">
            <CurrentDaySection data={weatherData.currentData} />
            <div className="flex flex-col flex-1 gap-4">
              <div className="md:flex-1">
                <WeeklyForecast data={weatherData.forecastData} />
              </div>
              <div className="flex md:flex-1">
                <div className="flex-1 h-full">
                  <OtherCitiesWeather />
                </div>
                <div className="flex-2">
                  <OtherCitiesWeather />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No weather data available. Please try again.</p>
      )}
    </>
  );
};

export default HomePage;
