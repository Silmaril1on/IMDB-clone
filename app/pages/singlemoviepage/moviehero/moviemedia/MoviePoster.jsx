"use client";
import BookmarkAddIcon from "@/app/components/BookmarkAddIcon";
import BookmarkSavedIcon from "@/app/components/BookmarkSavedIcon";
import { getWarning } from "@/app/features/moviesSlice";
import { db } from "@/app/firebase/firebaseConfig";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MoviePoster = ({ data }) => {
  const { user } = useSelector((store) => store.user);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkWatchlistStatus = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users watchlist", user.email);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const watchlist = userDoc.data().watchlist || [];
            setIsInWatchlist(watchlist.some((movie) => movie.id === data.id));
          }
        } catch (error) {
          console.error("Error checking watchlist status: ", error);
        }
      }
    };
    checkWatchlistStatus();
  }, [user, data.id]);

  const addToWatchlist = async () => {
    if (!user) {
      dispatch(getWarning());
      return;
    }
    if (user) {
      try {
        const userDocRef = doc(db, "users watchlist", user.email);
        await updateDoc(userDocRef, {
          watchlist: arrayUnion({
            id: data.id,
            movieTitle: data.movieTitle,
            moviePoster: data.moviePoster,
            movieBio: data.movieBio,
            movieLength: data.movieLength,
            movieDirectors: data.movieDirectors,
            movieGenre: data.movieGenre,
            movieActors: data.movieActors,
            movieYear: data.movieYear,
            isAdded: true,
          }),
        });
        setIsInWatchlist(true);
      } catch (error) {
        console.error("Error adding movie to watchlist: ", error);
      }
    }
  };

  const removeFromWatchlist = async () => {
    if (!user) {
      dispatch(getWarning());
      return;
    }
    if (user) {
      try {
        const userDocRef = doc(db, "users watchlist", user.email);
        await updateDoc(userDocRef, {
          watchlist: arrayRemove({
            id: data.id,
            movieTitle: data.movieTitle,
            moviePoster: data.moviePoster,
            movieBio: data.movieBio,
            movieLength: data.movieLength,
            movieDirectors: data.movieDirectors,
            movieGenre: data.movieGenre,
            movieActors: data.movieActors,
            movieYear: data.movieYear,
            isAdded: true,
          }),
        });
        setIsInWatchlist(false);
      } catch (error) {
        console.error("Error removing movie from watchlist: ", error);
      }
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-0">
        {isInWatchlist ? (
          <BookmarkSavedIcon onClick={removeFromWatchlist} />
        ) : (
          <BookmarkAddIcon onClick={addToWatchlist} />
        )}
      </div>
      <div className="w-72 h-[435px]">
        <Image
          className="w-full h-full rounded-lg"
          src={data.moviePoster}
          alt={data.movieTitle}
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default MoviePoster;
