"use client";
import { db } from "@/app/firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReorderComponent from "./ReorderComponent";
import DetailedView from "./DetailedView";
import GridView from "./GridView";
import MovieInfoModal from "./MovieInfoModal";
import { calculateAndSetAverageRating } from "@/app/utils";

const WatchlistCard = ({ dataType }) => {
  const { user } = useSelector((store) => store.user);
  const { watchlist, ratedMovies } = useSelector((store) => store.movie);
  const [ratingLoading, setRatingLoading] = useState(true);
  const userDocRef = doc(db, "users watchlist", `${user?.email}`);
  const [activeLayout, setActiveLyout] = useState(0);
  const [watchlistModal, setWatchlistModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [imdbRating, setImdbRating] = useState(null);
  const movies = dataType === "watchlist" ? watchlist : ratedMovies;

  useEffect(() => {
    const fetchRatings = async () => {
      const ratingsData = {};
      const movieList = dataType === "watchlist" ? watchlist : ratedMovies;
      if (movieList?.length > 0) {
        for (const movie of movieList) {
          const averageRating = await calculateAndSetAverageRating(
            movie.movieTitle
          );
          ratingsData[movie.movieTitle] = averageRating;
        }
        setImdbRating(ratingsData);
        setRatingLoading(false);
      }
    };

    fetchRatings();
  }, [movies, dataType]);

  const deleteMovie = async (passedId) => {
    try {
      const result = watchlist.filter((item) => item.id !== passedId);
      await updateDoc(userDocRef, {
        watchlist: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClick = () => {
    setWatchlistModal(!watchlistModal);
  };

  return (
    <>
      <div className="w-[65%] flex flex-col items-center justify-center px-5">
        {watchlistModal && selectedMovie && (
          <MovieInfoModal
            handleModalClick={handleModalClick}
            movie={selectedMovie}
            deleteMovie={deleteMovie}
            imdbRating={imdbRating}
          />
        )}
        <ReorderComponent
          dataType={dataType}
          activeLayout={activeLayout}
          setActiveLyout={setActiveLyout}
        />
        {activeLayout === 0 ? (
          <DetailedView
            data={movies}
            deleteMovie={deleteMovie}
            handleModalClick={handleModalClick}
            setSelectedMovie={setSelectedMovie}
            imdbRating={imdbRating}
            ratingLoading={ratingLoading}
          />
        ) : (
          <GridView
            data={movies}
            deleteMovie={deleteMovie}
            handleModalClick={handleModalClick}
            setSelectedMovie={setSelectedMovie}
            imdbRating={imdbRating}
          />
        )}
      </div>
    </>
  );
};

export default WatchlistCard;
