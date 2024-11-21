import Watchlist from "@/app/pages/watchlistpage/Watchlist";

export const metadata = {
  title: "IMDb: Your Watchlist",
  description: "IMDB page for user watchlist",
};

const WatchlistPage = () => {
  return (
    <div>
      <Watchlist />
    </div>
  );
};

export default WatchlistPage;
