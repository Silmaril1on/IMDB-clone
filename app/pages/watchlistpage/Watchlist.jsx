import WatchlistCard from "./watchlistCard/WatchlistCard";
import Header from "./watchlistHeader/Header";
import WatchlistSide from "./watchlistSide/WatchlistSide";

const Watchlist = () => {
  return (
    <div>
      <Header />
      <div className="h-full bg-neutral-200 flex flex-row px-[5%]">
        <WatchlistCard dataType="watchlist" />
        <WatchlistSide />
      </div>
    </div>
  );
};

export default Watchlist;
