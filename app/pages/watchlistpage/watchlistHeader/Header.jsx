"use client";
import WatchlistHeader from "./WatchlistHeader";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((store) => store.user);
  return (
    <WatchlistHeader>
      <h1 className="text-5xl">Your Watchlist</h1>
      <p className="text-neutral-300">
        by <span className="link-style">{user?.displayName}</span>• Created 8
        years ago • Modified 15 hours ago
      </p>
      <p className="text-sm w-[80%] text-neutral-300">
        Your Watchlist is the place to track the titles you want to watch. You
        can sort your Watchlist by the IMDb rating, popularity score and arrange
        your titles in the order you want to see them.
      </p>
    </WatchlistHeader>
  );
};

export default Header;
