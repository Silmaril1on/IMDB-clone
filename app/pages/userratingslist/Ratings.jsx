import WatchlistCard from "../watchlistpage/watchlistCard/WatchlistCard";
import WatchlistSide from "../watchlistpage/watchlistSide/WatchlistSide";

const Ratings = () => {
  return (
    <div className="bg-neutral-100 flex px-[7%]">
      <WatchlistCard dataType="rated" />
      <WatchlistSide />
    </div>
  );
};

export default Ratings;
