import { Forecast } from "../../types/weather";
import { getDayOfTheWeek } from "../../utils/utils";
import { Card } from "../Card/Card";

interface WeeklyForecastProps {
  data?: Forecast[];
}

export const WeeklyForecast = ({ data }: WeeklyForecastProps) => {
  return (
    <>
      <Card>
        <div className="flex flex-col justify-center items-center lg:flex-row lg:min-h-72">
          {data?.map((data, index) => (
            <div
              key={index}
              className=" flex m-2 text-2xl items-center min-w-full  justify-between lg:min-w-0 lg:min-h-60 lg:flex-col  "
            >
              <div className="flex items-center lg:max-h-40 lg:flex-col">
                <div className="mr-10 min-w-40  md:mb-14 md:mr-0 md:pr-4 font-thin lg:text-center ">
                  {getDayOfTheWeek(data.date)}
                </div>
                <div>
                  <img src={data.icon} alt="weather-icon" />
                </div>
              </div>
              <div className="font-bold text-2xl">
                {Math.ceil(data.temperature)}°c
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};
