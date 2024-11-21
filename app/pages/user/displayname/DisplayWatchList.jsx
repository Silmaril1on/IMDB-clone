"use client";
import {
  getRatedMoviesData,
  getWatchlistData,
} from "@/app/features/moviesSlice";
import { db } from "@/app/firebase/firebaseConfig";
import { fetchMovieRatings } from "@/app/utils";
import { doc, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useEffect } from "react";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const DisplayList = () => {
  const { user } = useSelector((store) => store.user);
  const { watchlist, movies } = useSelector((store) => store.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    onSnapshot(doc(db, "users watchlist", `${user?.email}`), (doc) => {
      dispatch(getWatchlistData(doc.data()?.watchlist));
    });
  }, [user?.email, dispatch]);

  useEffect(() => {
    const getMovieRatings = async () => {
      const allMovies = await fetchMovieRatings();
      movies;
      const userRatedMovies = allMovies.filter((movie) =>
        movie.ratings.some((rating) => rating.email === user?.email)
      );
      const matched = movies.filter((movie) =>
        userRatedMovies.some((ratedMovie) => ratedMovie.id === movie.id)
      );
      dispatch(getRatedMoviesData(matched));
    };
    getMovieRatings();
  }, [user?.email, movies]);

  return (
    <div className="gray-hover">
      {user ? (
        <Link
          href="/watchlist"
          className="flex flex-row space-x-2 items-center pb-1"
        >
          <BsBookmarkPlusFill />
          <h1 className="font-bold">Watchlist</h1>
          {watchlist?.length > 0 ? (
            <div className="bg-amber-400 mt-1 w-8 h-[15px] items-center text-[15px] flex justify-center text-black rounded-lg">
              <span>{watchlist?.length}</span>
            </div>
          ) : (
            ""
          )}
        </Link>
      ) : (
        <Link
          href="/registration"
          className="flex flex-row space-x-1 items-center"
        >
          <BsBookmarkPlusFill />
          <h1 className="font-bold">Watchlist</h1>
        </Link>
      )}
    </div>
  );
};

export default DisplayList;
