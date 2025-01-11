export const OtherCitiesWeather = () => {
  return (
    <div className="bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-2xl p-4 rounded-md w-full h-full">
      <div className="text-3xl text-black font-semibold mb-4">Other Cities</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className=" p-4 rounded-xl bg-[url('src/assets/location_photos/manchester-header.png')] h-60"></div>
        <div className="border-2 border-black p-4 rounded-xl"></div>
        <div className="border-2 border-black p-4 rounded-xl"></div>
        <div className="border-2 border-black p-4 rounded-xl"></div>
      </div>
    </div>
  );
};
