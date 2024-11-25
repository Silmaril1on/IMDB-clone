"use client";
import ImdbStar from "@/app/components/ImdbStar";
import LoadingSpin from "@/app/components/LoadingSpin";
import { getWarning, handleStarPanel } from "@/app/features/moviesSlice";
import { db } from "@/app/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MovieRatingsSection = ({ data, className, textColor }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [ratingsLength, setRatingsLength] = useState(0);
  const [currentMovieRate, setCurrentMovieRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const currentUser = user?.email;
  const movieID = data.id;

  const calculateAndSetAverageRating = async () => {
    setLoading(true);
    try {
      const movieRatingsRef = doc(db, "movie ratings", movieID);
      const ratingsSnapshot = await getDoc(movieRatingsRef);
      const ratingsData = ratingsSnapshot.data()?.ratings || [];
      setRatingsLength(ratingsData.length);
      if (ratingsData.length > 0) {
        const userRating = ratingsData.find(
          (rating) => rating.email === currentUser
        );
        if (userRating) {
          setCurrentMovieRate(userRating.movieRating);
        } else {
          setCurrentMovieRate(null);
        }
      } else {
        setCurrentMovieRate(null);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieID) {
      calculateAndSetAverageRating();
    }
  }, [movieID, currentUser]);

  const formatVoteCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
  };

  return (
    <div className={`w-[50%] flex items-center  space-x-10 ${className}`}>
      <div className="flex flex-col items-center ">
        <h1 className="font-bold text-[12px] tracking-widest">IMDb RATING</h1>
        <Link href={`/movierating/${data.movieTitle}`}>
          <div className="flex items-center gray-hover">
            <ImdbStar size={30} className="text-amber-400" />
            <div className="flex flex-col -space-y-2 ml-2">
              <span className="text-xl leading-1">
                <strong className={`${textColor || "text-white"}`}>
                  {data.imdb}
                </strong>
                /10
              </span>
              <span className="text-[12px]">
                {formatVoteCount(ratingsLength)}
              </span>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-col items-center ">
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
                <strong className={`${textColor || "text-white"}`}>
                  {currentMovieRate}
                </strong>
                /10
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieRatingsSection;
