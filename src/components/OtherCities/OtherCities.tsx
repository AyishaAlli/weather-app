import { Card } from "../Card/Card";

export const OtherCitiesWeather = ({ cities }) => {
  return (
    <Card title="Other Cities">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ">
        {cities.map((city, index: number) => {
          return (
            <div
              key={index}
              className="bg-opacity-60  backdrop-blur-lg shadow-xl rounded-md w-full h-full p-5 "
            >
              <h3 className="text-2xl">{city.name}</h3>
              <p>{city.temperature}°c</p>
              <p>{city.description}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
