import { Card } from "../Card/Card";

export const OtherCitiesWeather = () => {
  return (
    <Card title="Other Cities">
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
        <div className="bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-2xl p-4 rounded-md w-full h-full">
          <h3 className="text-2xl">Paris</h3>
          <p>20°c</p>
          <p>Partly Cloudy</p>
        </div>
        <div className="bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-2xl p-4 rounded-md w-full h-full">
          <h3 className="text-2xl">Paris</h3>
          20°c
          <p>Partly Cloudy</p>
        </div>
        <div className="bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-2xl p-4 rounded-md w-full h-full">
          <h3 className="text-2xl">Paris</h3>
          20°c
          <p>Partly Cloudy</p>
        </div>
      </div>
    </Card>
  );
};
