import CurrentDaySection from "../../components/CurrentDay/CurrentDay";
import { WeeklyForecast } from "../../components/WeeklyForecast/WeeklyForecast";
import { OtherCitiesWeather } from "../../components/OtherCities/OtherCities";
import NavBar from "../../components/NavBar/NavBar";
import { useState } from "react";

import useGeoLocation from "../../hooks/useGeoLocation";
import useGetWeatherData from "../../hooks/useGetWeatherData";
import { ExtraWeatherInfo } from "../../components/ExtraWeatherInfo/ExtraWeatherInfo";
import useGetCitiesData from "../../hooks/useGetCitiesData";

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: geoLocationData, loading, error } = useGeoLocation();
  const {
    data: weatherData,
    isLoading: weatherDataLoading,
    error: weatherDataError,
  } = useGetWeatherData(geoLocationData, searchQuery);

  const { data: citiesData } = useGetCitiesData();

  const isLoading = loading || weatherDataLoading;

  if (isLoading) {
    return <p>Loading weather data...</p>;
  }

  if (error || weatherDataError) {
    return <p>Error: {error?.message || weatherDataError?.message}</p>;
  }

  console.log(citiesData);

  return (
    <>
      {weatherData?.currentData ? (
        <div className="h-screen flex flex-col ">
          <NavBar
            onSearch={setSearchQuery}
            searchQueary={searchQuery}
            cityName={weatherData.currentData.name}
          />

          <div className="flex-grow flex flex-col lg:flex-row m-4 gap-4 ">
            {/* Left Section - Current Day */}
            <CurrentDaySection data={weatherData.currentData} />

            {/* Right Section - Forecast */}
            <div className="flex  flex-col lg:flex-[3] gap-10 min-w-0">
              {/* Weekly Forecast */}
              <div className=" min-w-0">
                <WeeklyForecast data={weatherData.forecastData} />
              </div>

              {/* Right Section - Other Information */}
              <div className=" lg:flex gap-4">
                <div className="flex-1  min-w-0">
                  <ExtraWeatherInfo data={weatherData.currentData} />
                </div>
                <div className="flex-[1.5] min-w-0 ">
                  <OtherCitiesWeather cities={citiesData} />
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
