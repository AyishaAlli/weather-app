function NavBar() {
  return (
    <nav className="bg-[#49076C] p-4 m-2 rounded-md flex items-center justify-between">
      <div className="text-white text-3xl hidden sm:block">London</div>
      <div className="flex flex-grow justify-center sm:justify-end items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-l-md border-none focus:ring-2 focus:ring-purple-300"
        />
        <button className="bg-purple-700 text-white px-4 py-2 rounded-r-md hover:bg-purple-600">
          Search
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
