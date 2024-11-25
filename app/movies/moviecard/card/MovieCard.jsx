import { useDispatch, useSelector } from "react-redux";
import StarsPanel from "./stars/StarPanel";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MovieCardInfo from "./MovieCardInfo";
import MovieBookMark from "./MovieBookMark";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";
import InfoModal from "./InfoModal";
import { createRecentlyViewed } from "@/app/utils";
import LeftButton from "@/app/components/LeftButton";
import RightButton from "@/app/components/RightButton";
import { getRecentlyData, getWarning } from "@/app/features/moviesSlice";

const MovieCard = ({ movies }) => {
  const dispatch = useDispatch();
  const { openStarPanel, recently } = useSelector((store) => store.movie);
  const { user } = useSelector((store) => store.user);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlistStatus, setWatchlistStatus] = useState({});
  const [movieInfoModal, setMovieInfoModal] = useState(false);
  const itemsPerPage = 6;
  const cardWidth = 200;
  const cardMargin = 10;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (user) {
        const userWatchlistRef = doc(db, "users watchlist", user.email);
        const docSnap = await getDoc(userWatchlistRef);

        if (docSnap.exists()) {
          const watchlistMovies = docSnap.data().watchlist || [];
          const watchlistMap = {};
          watchlistMovies.forEach((movie) => {
            watchlistMap[movie.id] = true;
          });
          setWatchlistStatus(watchlistMap);
        }
      }
    };

    fetchWatchlist();
  }, [user]);

  const addToWatchlist = async (movie) => {
    if (!user) {
      dispatch(getWarning());
      return;
    }
    try {
      const userWatchlistRef = doc(db, "users watchlist", user.email);
      await setDoc(
        userWatchlistRef,
        {
          watchlist: arrayUnion({
            id: movie.id,
            movieTitle: movie.movieTitle,
            moviePoster: movie.moviePoster,
            movieBio: movie.movieBio,
            movieLength: movie.movieLength,
            movieDirectors: movie.movieDirectors,
            movieGenre: movie.movieGenre,
            movieActors: movie.movieActors,
            movieYear: movie.movieYear,
            isAdded: true,
            addedAt: new Date().toISOString(),
            imdb: movie.imdb ? movie.imdb : 0,
          }),
        },
        { merge: true }
      );
      alert("Movie added to your watchlist!");
      setWatchlistStatus((prevStatus) => ({
        ...prevStatus,
        [movie.id]: true,
      }));
    } catch (error) {
      console.error("Error adding movie to watchlist: ", error);
    }
  };

  const removeFromWatchlist = async (movie) => {
    if (!user) {
      dispatch(getWarning());
      return;
    }
    try {
      const userWatchlistRef = doc(db, "users watchlist", user.email);
      await setDoc(
        userWatchlistRef,
        {
          watchlist: arrayRemove({
            id: movie.id,
            movieTitle: movie.movieTitle,
            moviePoster: movie.moviePoster,
            movieBio: movie.movieBio,
            movieLength: movie.movieLength,
            movieDirectors: movie.movieDirectors,
            movieGenre: movie.movieGenre,
            movieActors: movie.movieActors,
            movieYear: movie.movieYear,
            isAdded: true,
            imdb: movie.imdb,
          }),
        },
        { merge: true }
      );
      alert("Movie removed from your watchlist!");
      setWatchlistStatus((prevStatus) => ({
        ...prevStatus,
        [movie.id]: false,
      }));
    } catch (error) {
      console.error("Error removing movie from watchlist: ", error);
    }
  };

  const handleMovieClick = async (movie) => {
    const newMovie = await createRecentlyViewed(movie, user, "movie");
    if (newMovie) {
      dispatch(getRecentlyData([newMovie, ...recently]));
    }
  };

  const slideNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, movies.length - itemsPerPage)
    );
  };

  const slidePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  return (
    <>
      {openStarPanel && selectedMovie && <StarsPanel movie={selectedMovie} />}
      {movieInfoModal && selectedMovie && (
        <InfoModal
          setMovieInfoModal={setMovieInfoModal}
          movie={selectedMovie}
          removeFromWatchlist={removeFromWatchlist}
          addToWatchlist={addToWatchlist}
          isInWatchlist={watchlistStatus[selectedMovie.id]}
        />
      )}
      <div className="py-3 flex flex-col items-center">
        <div
          className="overflow-hidden relative flex items-center group"
          style={{ width: `${(cardWidth + 2 * cardMargin) * itemsPerPage}px` }}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out relative z-[5]"
            style={{
              transform: `translateX(-${
                currentIndex * (cardWidth + 2 * cardMargin)
              }px)`,
              width: `${(cardWidth + 2 * cardMargin) * movies.length}px`,
            }}
          >
            {movies.slice(0, 29).map((item) => {
              const isInWatchlist = watchlistStatus[item.id];
              return (
                <Link key={item.id} href={`/${item.movieTitle}`}>
                  <div
                    style={{
                      width: `${cardWidth}px`,
                      margin: `0 ${cardMargin}px`,
                    }}
                    onClick={() => handleMovieClick(item)}
                    className="flex flex-col relative rounded-b-xl bg-stone-800"
                  >
                    <MovieBookMark
                      item={item}
                      addToWatchlist={
                        isInWatchlist ? removeFromWatchlist : addToWatchlist
                      }
                      isInWatchlist={isInWatchlist}
                      setWatchlistStatus={setWatchlistStatus}
                    />
                    <div className="w-full h-[290px]">
                      <Image
                        className="h-full brightness-90 w-full hover:brightness-100"
                        src={item.moviePoster}
                        alt={item.movieTitle}
                        width={500}
                        height={500}
                        quality={100}
                        priority
                      />
                    </div>
                    <MovieCardInfo
                      item={item}
                      addToWatchlist={
                        isInWatchlist ? removeFromWatchlist : addToWatchlist
                      }
                      setSelectedMovie={() => setSelectedMovie(item)}
                      setMovieInfoModal={() => {
                        setSelectedMovie(item);
                        setMovieInfoModal(true);
                      }}
                      movie={selectedMovie}
                      isInWatchlist={isInWatchlist}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="absolute opacity-0 group-hover:opacity-100 mb-20 w-full flex justify-between *:absolute *:z-10">
            <LeftButton className="left-2" onClick={slidePrev} />
            <RightButton className="right-2" onClick={slideNext} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
