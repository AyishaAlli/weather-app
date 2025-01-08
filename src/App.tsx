//import { useState } from "react";

import "./App.css";
import CurrentDaySection from "./components/CurrentDaySection/CurrentDaySection";
import { WeeklyForecast } from "./components/WeeklyForecast/WeeklyForecast";
import { OtherCitiesWeather } from "./components/OtherCitiesWeather/OtherCitiesWeather";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex flex-col md:flex-row m-4 gap-4">
        {/* Left Section */}
        <CurrentDaySection />
        {/* Right Section */}
        <div className="flex flex-col flex-1 gap-4">
          <div className="md:flex-[1.5]">
            <WeeklyForecast />
          </div>
          <div className="flex-1">
            <OtherCitiesWeather />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
