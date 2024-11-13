"use client";
import { useSelector } from "react-redux";
import WatchlistHeader from "../watchlistpage/watchlistHeader/WatchlistHeader";

const Header = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <WatchlistHeader>
      <h1 className="text-5xl">Your Ratings</h1>
      <p className="text-neutral-300">
        by <span className="link-style">{user?.displayName}</span>
      </p>
      <p className="text-sm w-[80%] text-neutral-300">
        This page compiles a list of titles you have rated, providing a
        convenient overview of all your ratings.
      </p>
    </WatchlistHeader>
  );
};

export default Header;
