import CurrentDaySection from "../../components/CurrentDay/CurrentDay";
import { WeeklyForecast } from "../../components/WeeklyForecast/WeeklyForecast";
import { OtherCitiesWeather } from "../../components/OtherCities/OtherCities";
import NavBar from "../../components/NavBar/NavBar";
import { useState } from "react";

import useGeoLocation from "../../hooks/useGeoLocation";
import useGetWeatherData from "../../hooks/useGetWeatherData";
import { ExtraWeatherInfo } from "../../components/ExtraWeatherInfo/ExtraWeatherInfo";
import useGetCitiesData from "../../hooks/useGetCitiesData";
import { LoadingComponent } from "../../components/Loading/Loading";
import ErrorComponent from "../../components/Error/Error";

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
    return <LoadingComponent />;
  }

  if (error || weatherDataError) {
    return (
      <ErrorComponent message={error?.message || weatherDataError?.message} />
    );
  }

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
