import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { LoadingComponent } from "../Loading/Loading";

interface NavBarProps {
  onSearch: (city: string) => void;
  cityName?: string;
  searchQueary: string;
  isLoading: boolean;
}

function NavBar({ onSearch, cityName, searchQueary, isLoading }: NavBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(searchQueary);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      onSearch(inputValue);
      setInputValue("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedCity = inputValue.trim();
    if (trimmedCity !== "") {
      onSearch(trimmedCity);
      setInputValue("");
    } else {
      alert("Please enter a city name.");
    }
  };

  return (
    <nav className="bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-2xl p-4 ml-4 mr-4 mt-7 rounded-xl flex items-center justify-between">
      <div className="text-black text-3xl hidden md:block">{cityName}</div>
      <div className="flex flex-grow justify-center md:justify-end">
        <form onSubmit={handleSubmit} className="flex">
          <div className="relative">
            <input
              type="text"
              placeholder="Search city..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="px-4 py-2 rounded-full shadow-2xl bg-gray-200 focus:ring-2 focus:ring-purple-300 pr-10"
              data-testid="city-input"
            />

            {!isFocused && !isLoading && (
              <FaSearch
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                data-testid="search-icon"
              />
            )}
            {isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <LoadingComponent loaderType="small" />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#49076C] text-white px-8 ml-2 rounded-full hover:bg-purple-800"
            data-testid="search-button"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default NavBar;
