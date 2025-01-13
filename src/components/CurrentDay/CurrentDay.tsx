import { InfoCard } from "../InfoCard/InfoCard";
import { CiSun } from "react-icons/ci";
import { CiCloudSun } from "react-icons/ci";

const CurrentDaySection = ({ data }) => {
  const time = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const weatherInfo = [
    { label: "Pressure", value: `${data.pressure} hPa` },
    { label: "Humidity", value: `${data.humidity}%` },
    { label: "Visibility", value: `${data.visibility} km` },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl flex flex-col justify-between bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-2xl">
      <div className="flex justify-between items-center">
        <div className="text-left opacity-70 bg-[#49076C] text-white rounded-full text-xl px-4 py-1 mb-4 block md:opacity-0">
          {data.name}
        </div>
        <div className="text-center  text-black px-4 py-1  mb-4 md:w-20 md:text-white md:bg-[#49076C] rounded-full">
          {time}
        </div>
      </div>

      <div>
        <div className="flex items-center">
          <span>
            <img src={data.icon} width={70} />
          </span>
          <p className="">{data.description}</p>
        </div>
        <div className="text-9xl self-center text-black font-normal">
          {data.temperature}°c
        </div>
      </div>

      <div className="flex justify-around text-center mt-10">
        {weatherInfo.map((info, index) => (
          <div key={index} className="flex flex-col items-start">
            <div className="text-md text-gray-700 font-thin">{info.label}</div>
            <div className="text-xl text-black">{info.value}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-around mt-4 md:flex-col">
        <InfoCard title="Sunrise" time={data.sunrise} icon={<CiSun />} />
        <InfoCard title="Sunset" time={data.sunset} icon={<CiCloudSun />} />
      </div>
    </div>
  );
};

export default CurrentDaySection;
