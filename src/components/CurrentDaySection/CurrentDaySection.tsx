const CurrentDaySection = () => {
  return (
    <div className="bg-[#370552] p-4 rounded-md flex flex-col justify-between">
      <div>
        <div className="text-center text-white text-6xl px-4 py-1 rounded-md mb-4 block md:hidden">
          London
        </div>
        <div className="text-center bg-white text-black px-4 py-1 rounded-full mb-4  md:w-20 md:float-end">
          22:22
        </div>
      </div>
      <div className="text-9xl font-bold mt-4 self-center">20°</div>
      <div className="self-center">ICON</div>
      <div className="space-y-2 mt-4 items-center">
        <div className="bg-purple-500 p-4 rounded-md">SUNRISE</div>
        <div className="bg-purple-500 p-4 rounded-md">SUNSET</div>
      </div>
    </div>
  );
};

export default CurrentDaySection;
