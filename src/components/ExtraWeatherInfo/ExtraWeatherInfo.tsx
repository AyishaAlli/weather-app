import {
  FaTemperatureArrowDown,
  FaTemperatureArrowUp,
  FaWater,
  FaWind,
} from "react-icons/fa6";
import { Card } from "../Card/Card";
import { TbTemperature } from "react-icons/tb";
import { SiFlat } from "react-icons/si";

export const ExtraWeatherInfo = ({ data }) => {
  return (
    <Card title="Today">
      <div className="grid grid-cols-3">
        <div>
          <div className="p-5 w-full h-full flex flex-col justify-center items-center">
            <p>Minimum Temp</p>
            <FaTemperatureArrowDown />
            <p>{data.extraWeatherInfo.minTemp}°c</p>
          </div>
        </div>

        <div>
          <div className="p-5 w-full h-full flex flex-col justify-center items-center">
            <p>Maximum Temp</p>
            <FaTemperatureArrowUp />
            <p>{data.extraWeatherInfo.maxTemp}°c</p>
          </div>
        </div>
        <div>
          <div className="p-5 w-full h-full flex flex-col justify-center items-center">
            <p>Feels Like</p>
            <TbTemperature />
            <p>{data.extraWeatherInfo.feelsLike}°c</p>
          </div>
        </div>
        <div>
          <div className="p-5 w-full h-full flex flex-col justify-center items-center">
            <p>Wind Speed</p>
            <FaWind />
            <p>{data.extraWeatherInfo.windSpeed}m</p>
          </div>
        </div>
        <div>
          <div className="p-5 w-full h-full flex flex-col justify-center items-center">
            <p>SeaLevel</p>
            <FaWater />
            <p>{data.extraWeatherInfo.seaLevel}hPa</p>
          </div>
        </div>
        <div>
          <div className="p-5 w-full h-full flex flex-col justify-center items-center">
            <p>Gound Level</p>
            <SiFlat />
            <p>{data.extraWeatherInfo.groundLevel}hPa</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
