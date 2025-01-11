import { useState } from "react";

interface SearchCityProps {
  onSearch: (city: string) => void;
}

export const SearchCity = ({ onSearch }: SearchCityProps) => {
  const [city, setCity] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
    }
  };
  return (
    <div className="flex flex-grow justify-center sm:justify-end">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 rounded-full border-none focus:ring-2 focus:ring-purple-300"
        />
        <button className="bg-purple-700 text-white px-8 ml-2 py-2 rounded-full hover:bg-purple-600">
          Search
        </button>
      </form>
    </div>
  );
};
