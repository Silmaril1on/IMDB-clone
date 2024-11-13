"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";

const WatchlistSide = () => {
  const { watchlist, ratedMovies } = useSelector((store) => store.movie);
  const lastAddedMovietoWatchlist = watchlist?.[watchlist.length - 1] || null;
  const lastRatedMovie = ratedMovies?.[ratedMovies.length - 1] || null;

  console.log(ratedMovies, "rated");

  return (
    <div className="w-[35%] text-black flex flex-col py-5 pl-[5%] space-y-3">
      <h1 className="font-bold text-3xl relative gold-line-border px-3 mb-6">
        More to explore
      </h1>
      <LastMovieOfWatchlist
        data={lastAddedMovietoWatchlist}
        length={watchlist}
      />
      <LastRatedMovie data={lastRatedMovie} length={ratedMovies} />
    </div>
  );
};

const LastMovieOfWatchlist = ({ data, length }) => {
  const updateTime = data?.addedAt
    ? formatDistanceToNow(new Date(data.addedAt), { addSuffix: true })
    : "No recent updates";
  return (
    <Link href="/watchlist">
      <div className="flex items-center justify-between px-5 py-4 border border-neutral-400/60 rounded-md group">
        <article className="flex flex-col space-y-4">
          <h1 className="group-hover:underline">Your Watchlist</h1>
          <span className="text-sm text-neutral-500">
            {length?.length} titles
          </span>
          <span className="text-[11px]">Updated {updateTime}</span>
        </article>
        <div className="w-20 rounded-md center overflow-hidden group-hover:brightness-90">
          {data?.moviePoster ? (
            <Image
              src={data?.moviePoster}
              alt={data?.movieTitle}
              width={200}
              height={200}
            />
          ) : (
            <span className="text-[10px]">No Watchlist</span>
          )}
        </div>
      </div>
    </Link>
  );
};

const LastRatedMovie = ({ data, length }) => {
  return (
    <Link href="/ratings">
      <div className="flex items-center justify-between px-5 py-4 border border-neutral-400/60 rounded-md group">
        <article className="flex flex-col space-y-4">
          <h1 className="group-hover:underline">Your Ratings</h1>
          <span className="text-sm text-neutral-500">
            {length?.length} titles
          </span>
        </article>
        <div className="w-20 rounded-md overflow-hidden group-hover:brightness-90">
          <Image
            src={data?.moviePoster}
            alt={data?.movieTitle}
            width={200}
            height={200}
          />
        </div>
      </div>
    </Link>
  );
};

export default WatchlistSide;
