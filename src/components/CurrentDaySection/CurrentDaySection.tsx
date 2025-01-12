const CurrentDaySection = ({ data }) => {
  const time = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white p-10 rounded-2xl flex flex-col justify-between bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-2xl">
      <div>
        <div className="text-center text-black text-6xl px-4 py-1 rounded-md mb-4 block md:hidden">
          {data.cityName}
        </div>
        <div className="text-center bg-[#49076C] text-white px-4 py-1 rounded-full mb-4  md:w-20 md:float-end">
          {time}
        </div>
      </div>

      <div className="text-7xl font-bold mt-4 self-center text-black">
        {data.temperature}°c
      </div>

      <div className="space-y-2 mt-4 items-center">
        <div className="bg-[#49076C] text-white p-4 rounded-lg">
          Sunrise: {data.sunrise}
        </div>
        <div className="bg-[#49076C] text-white p-4 rounded-lg">
          Sunset: {data.sunset}
        </div>
      </div>
    </div>
  );
};

export default CurrentDaySection;
