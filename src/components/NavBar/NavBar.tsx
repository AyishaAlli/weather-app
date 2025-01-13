import { SearchCity } from "../SearchCity/SearchCity";

interface NavBarProps {
  onSearch: (city: string) => void;
  cityName: string | null;
}

function NavBar({ onSearch, cityName }: NavBarProps) {
  return (
    <nav className="bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-2xl p-4 ml-4 mr-4 mt-7 rounded-xl flex items-center justify-between">
      <div className="text-black text-3xl hidden sm:block">{cityName}</div>
      <SearchCity onSearch={onSearch} />
    </nav>
  );
}

export default NavBar;
