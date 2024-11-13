"use client";
import ImdbStar from "@/app/components/ImdbStar";
import LoadingSpin from "@/app/components/LoadingSpin";
import { getWarning, handleStarPanel } from "@/app/features/moviesSlice";
import { db } from "@/app/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MovieRatingsSection = ({ data }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [imdbRating, setImdbRating] = useState(null);
  const [ratingsLength, setRatingsLength] = useState(0);
  const [currentMovieRate, setCurrentMovieRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const currentUser = user?.email;
  const movieTitle = data.movieTitle;

  const calculateAndSetAverageRating = async () => {
    setLoading(true);
    try {
      const movieRatingsRef = doc(db, "movie ratings", movieTitle);
      const imdbRatingsRef = doc(db, "imdb ratings", movieTitle);
      const ratingsSnapshot = await getDoc(movieRatingsRef);
      const ratingsData = ratingsSnapshot.data()?.ratings || [];
      setRatingsLength(ratingsData.length);

      if (ratingsData.length > 0) {
        const totalRating = ratingsData.reduce(
          (acc, curr) => acc + curr.movieRating,
          0
        );
        const averageRating = totalRating / ratingsData.length;
        const formattedRating = Number.isInteger(averageRating)
          ? averageRating.toString()
          : averageRating.toFixed(1);
        await setDoc(imdbRatingsRef, { averageRating }, { merge: true });
        setImdbRating(formattedRating);

        const userRating = ratingsData.find(
          (rating) => rating.email === currentUser
        );
        if (userRating) {
          setCurrentMovieRate(userRating.movieRating);
        } else {
          setCurrentMovieRate(null);
        }
      } else {
        setImdbRating("0");
        setCurrentMovieRate(null);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieTitle) {
      calculateAndSetAverageRating();
    }
  }, [movieTitle, currentUser]);

  const formatVoteCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
  };

  return (
    <div className="w-[50%] flex items-center justify-end space-x-10">
      <div className="flex flex-col items-center text-neutral-300">
        <h1 className="font-bold text-[12px] tracking-widest">IMDb RATING</h1>
        <div className="flex items-center gray-hover">
          <ImdbStar size={30} className="text-amber-400" />
          {loading ? (
            <LoadingSpin />
          ) : (
            <div className="flex flex-col -space-y-2 ml-2">
              <span className="text-xl leading-1">
                <strong className="text-white">{imdbRating}</strong> /10
              </span>
              <span className="text-[12px]">
                {formatVoteCount(ratingsLength)}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center text-neutral-300">
        <h1 className="font-bold text-[12px] tracking-widest">YOUR RATING</h1>
        <div
          className="flex items-center gray-hover"
          onClick={() => {
            if (!user) {
              dispatch(getWarning());
              return;
            } else {
              dispatch(handleStarPanel());
            }
          }}
        >
          <ImdbStar size={30} className="text-blue-400" />
          {loading ? (
            <LoadingSpin />
          ) : (
            <div className="flex flex-col ml-2 py-1">
              <span className="text-xl">
                <strong className="text-white">{currentMovieRate}</strong> /10
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieRatingsSection;
