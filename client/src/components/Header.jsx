import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", search);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearch(searchTermFromUrl);
    }
  },[location.search]);
  
  return (
    <header className="bg-green-100">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-green-500">Ghar</span>
            <span className="text-green-700">Jagga</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-green-50 p-3 rounded-lg flex items-center "
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <FaSearch className="text-green-500" />
          </button>
        </form>
        <ul className="flex gap-5">
          <Link to="/">
            <li className="hidden sm:inline text-green-800 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline  text-green-800 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="rounded-full h-7 w-7 object-cover "
              />
            ) : (
              <li className="text-green-800 hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
