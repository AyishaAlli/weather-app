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
      <div className="grid grid-cols-3 p-7">
        <div>
          <div className="text-sm w-full h-full flex flex-col justify-center items-center">
            <p>Min Temp</p>
            <FaTemperatureArrowDown />
            <p className="font-extrabold">{data.extraWeatherInfo.minTemp}°c</p>
          </div>
        </div>

        <div>
          <div className="p-5 text-sm w-full h-full flex flex-col justify-center items-center">
            <p>Max Temp</p>
            <FaTemperatureArrowUp />
            <p className="font-extrabold">{data.extraWeatherInfo.maxTemp}°c</p>
          </div>
        </div>
        <div>
          <div className="p-5 text-sm w-full h-full flex flex-col justify-center items-center">
            <p>Feels Like</p>
            <TbTemperature />
            <p className="font-extrabold">
              {data.extraWeatherInfo.feelsLike}°c
            </p>
          </div>
        </div>
        <div>
          <div className="text-sm w-full h-full flex flex-col justify-center items-center">
            <p>Wind Speed</p>
            <FaWind />
            <p className="font-extrabold">{data.extraWeatherInfo.windSpeed}m</p>
          </div>
        </div>
        <div>
          <div className="p-5 text-sm w-full h-full flex flex-col justify-center items-center">
            <p>SeaLevel</p>
            <FaWater />
            <p className="font-extrabold">
              {data.extraWeatherInfo.seaLevel}hPa
            </p>
          </div>
        </div>
        <div>
          <div className="text-sm w-full h-full flex flex-col justify-center items-center">
            <p>Gound Level</p>
            <SiFlat />
            <p className="font-extrabold">
              {data.extraWeatherInfo.groundLevel}hPa
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
