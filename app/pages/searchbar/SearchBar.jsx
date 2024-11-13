"use client";
import ImdbProLogo from "@/app/components/ImdbProLogo";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";

const SearchBar = () => {
  const { movies, actors } = useSelector((store) => store.movie);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const movieResults = movies
        .filter((movie) =>
          movie.movieTitle.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((movie) => ({ ...movie, type: "movie" }));
      const actorResults = actors
        .filter((actor) =>
          actor.actorName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((actor) => ({ ...actor, type: "actor" }));
      setFilteredResults([...movieResults, ...actorResults]);
      setIsOpen(true);
    } else {
      setFilteredResults([]);
    }
  }, [searchTerm, movies, actors]);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  return (
    <div className="flex items-center space-x-4 border-r-2 border-neutral-600 px-4 relative">
      <form className="w-[500px]" onSubmit={(e) => e.preventDefault()}>
        <input
          className="bg-neutral-100 text-black pl-2 rounded-sm outline-none focus:outline-2 placeholder:pl-2 focus:outline-amber-400 placeholder:text-sm placeholder:text-neutral-500 w-full"
          name="search"
          id="search"
          placeholder="Search IMDb"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <ImdbProLogo />
      {isOpen && (
        <SearchResults
          setIsOpen={setIsOpen}
          filteredResults={filteredResults}
        />
      )}
    </div>
  );
};

export default SearchBar;
