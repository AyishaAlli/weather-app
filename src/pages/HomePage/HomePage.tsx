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
import { Card } from "../../components/Card/Card";

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: geoLocationData, loading, error } = useGeoLocation();
  const {
    data: weatherData,
    isLoading: weatherDataLoading,
    error: weatherDataError,
  } = useGetWeatherData(geoLocationData, searchQuery);

  const { data: citiesData } = useGetCitiesData();

  if (loading) {
    return <LoadingComponent />;
  }

  const defaultWeatherData = {
    currentData: {
      name: "N/A",
      temperature: 0,
      condition: "N/A",
      icon: "public/assets/mm_api_symbols/wsymbol_0000_unknown.png",
      pressure: "N/A",
      humidity: "N/A",
      visibility: "N/A",
      extraWeatherInfo: {
        minTemp: 0,
        maxTemp: 0,
        feelsLike: 0,
        windSpeed: 0,
        seaLevel: 0,
        gorundlevel: 0,
      },
    },
    forecastData: Array(5).fill({
      date: 0,
      temperature: 0,

      icon: "public/assets/mm_api_symbols/wsymbol_0000_unknown.png",
    }),
  };

  const weatherDataToUse = weatherData ?? defaultWeatherData;

  return (
    <>
      <div className="h-screen flex flex-col ">
        <NavBar
          onSearch={setSearchQuery}
          searchQueary={searchQuery}
          cityName={weatherDataToUse.currentData?.name}
          isLoading={weatherDataLoading}
        />
        {(weatherDataError || error) && (
          <ErrorComponent
            message={
              weatherDataError
                ? "City not Found, please enter a valid city"
                : error?.message
            }
          />
        )}
        {weatherDataLoading ? (
          <Card>
            <div></div>
          </Card>
        ) : (
          <div className="flex-grow flex flex-col lg:flex-row m-4 gap-4 ">
            {/* Left Section - Current Day */}
            <CurrentDaySection data={weatherDataToUse.currentData} />

            {/* Right Section - Forecast */}
            <div className="flex  flex-col lg:flex-[3] gap-10 min-w-0">
              {/* Weekly Forecast */}
              <div className=" min-w-0">
                <WeeklyForecast data={weatherDataToUse.forecastData} />
              </div>

              {/* Right Section - Other Information */}
              <div className=" lg:flex gap-4">
                <div className="flex-1  min-w-0">
                  <ExtraWeatherInfo data={weatherDataToUse.currentData} />
                </div>
                <div className="flex-[1.5] min-w-0 ">
                  <OtherCitiesWeather cities={citiesData} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
