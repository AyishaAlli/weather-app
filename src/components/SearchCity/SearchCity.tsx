import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchCityProps {
  onSearch: (city: string) => void;
}

export const SearchCity = ({ onSearch }: SearchCityProps) => {
  const [city, setCity] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && city.trim() !== "") {
      // Only trigger search if city is not empty
      if (onSearch) {
        onSearch(city);
      }
      setCity("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    if (trimmedCity !== "") {
      if (trimmedCity) {
        onSearch(trimmedCity);
      }
    } else {
      alert("Please enter a city name.");
    }
  };

  return (
    <div className="flex flex-grow justify-center sm:justify-end">
      <form onSubmit={handleSubmit} className="flex">
        <div className="relative">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyUp={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="px-4 py-2 rounded-full shadow-2xl bg-gray-200 focus:ring-2 focus:ring-purple-300 pr-10"
            data-testid="city-input"
          />

          {!isFocused && (
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          )}
        </div>
        <button
          type="submit"
          className=" bg-[#49076C] text-white px-8 ml-2 py-2 rounded-full hover:bg-purple-800"
        >
          Search
        </button>
      </form>
    </div>
  );
};
