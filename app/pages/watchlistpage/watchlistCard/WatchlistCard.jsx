"use client";
import { db } from "@/app/firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReorderComponent from "./ReorderComponent";
import DetailedView from "./DetailedView";
import GridView from "./GridView";
import MovieInfoModal from "./MovieInfoModal";
import { useMotionValueEvent, useScroll } from "framer-motion";
import ScrollToTopButton from "../../moviereviewspage/reviewssection/ScrollToTopButton";
import { createRecentlyViewed } from "@/app/utils";
import { getRecentlyData } from "@/app/features/moviesSlice";

const WatchlistCard = ({ dataType }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { watchlist, ratedMovies, recently } = useSelector(
    (store) => store.movie
  );
  const userDocRef = doc(db, "users watchlist", `${user?.email}`);
  const [activeLayout, setActiveLyout] = useState(0);
  const [watchlistModal, setWatchlistModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const movies = dataType === "watchlist" ? watchlist : ratedMovies;

  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 600) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

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

  const handleMovieClick = async (movie) => {
    const newMovie = await createRecentlyViewed(movie, user, "movie");
    if (newMovie) {
      dispatch(getRecentlyData([newMovie, ...recently]));
    }
  };

  const handleModalClick = () => {
    setWatchlistModal(!watchlistModal);
  };

  return (
    <>
      <div className="w-[65%] flex flex-col items-center justify-center px-5">
        {hidden && <ScrollToTopButton />}
        {watchlistModal && selectedMovie && (
          <MovieInfoModal
            handleModalClick={handleModalClick}
            movie={selectedMovie}
            deleteMovie={deleteMovie}
          />
        )}
        <ReorderComponent
          dataType={dataType}
          activeLayout={activeLayout}
          setActiveLyout={setActiveLyout}
        />
        {activeLayout === 0 ? (
          <DetailedView
            addRecent={handleMovieClick}
            data={movies}
            deleteMovie={deleteMovie}
            handleModalClick={handleModalClick}
            setSelectedMovie={setSelectedMovie}
          />
        ) : (
          <GridView
            data={movies}
            deleteMovie={deleteMovie}
            handleModalClick={handleModalClick}
            setSelectedMovie={setSelectedMovie}
          />
        )}
      </div>
    </>
  );
};

export default WatchlistCard;
