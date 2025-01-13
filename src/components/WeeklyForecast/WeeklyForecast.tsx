import { Forecast } from "../../types/weather";
import { getDayOfTheWeek } from "../../utils/utils";

interface WeeklyForecastProps {
  data: Forecast[];
}

export const WeeklyForecast = ({ data }: WeeklyForecastProps) => {
  return (
    <>
      <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-2xl p-4  rounded-xl  h-full flex flex-col md:flex-row justify-center items-center">
        {data?.map((data, index) => (
          <div
            key={index}
            className="flex  p-4 text-2xl font-semibold text-center md:flex-col "
          >
            <span className="mr-40 md:mb-14 md:mr-0 md:pr-4">
              {getDayOfTheWeek(data.date)}
            </span>
            <span>
              <img src={data.icon} alt="weather-icon" />
            </span>
            <span>{Math.ceil(data.temperature)}°</span>
          </div>
        ))}
      </div>
    </>
  );
};
