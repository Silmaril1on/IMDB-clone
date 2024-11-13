import React, { useEffect, useState } from "react";
import CloseButton from "@/app/components/CloseButton";
import { FaRegStar, FaStar } from "react-icons/fa";
import { auth, db } from "@/app/firebase/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { getUsersRating, handleStarPanel } from "@/app/features/moviesSlice";
import { motion } from "framer-motion";
import { popUpStyle } from "@/app/animations/framermotion";

const StarsPanel = ({ movie }) => {
  const [hover, setHover] = useState(null);
  const dispatch = useDispatch();
  const { userRatings } = useSelector((store) => store.movie);

  useEffect(() => {
    const fetchUserRating = async () => {
      const movieRatingsRef = doc(db, "movie ratings", movie.movieTitle);
      const found = await getDoc(movieRatingsRef);
      const rating = (found.data() || {}).ratings || [];
      const myRating = rating.find((r) => r.email === auth.currentUser?.email);
      if (myRating) {
        dispatch(getUsersRating(myRating.movieRating));
      }
    };
    fetchUserRating();
  }, [movie.movieTitle]);

  const updateRating = async () => {
    const movieRatingsRef = doc(db, "movie ratings", movie.movieTitle);
    const found = await getDoc(movieRatingsRef);
    const rating = (found.data() || {}).ratings || [];
    const myRating = rating.find((r) => r.email === auth.currentUser?.email);
    if (!myRating) {
      await setDoc(movieRatingsRef, {
        ratings: [
          ...(rating || []),
          {
            movieRating: Number(userRatings),
            email: auth.currentUser?.email,
            author: auth.currentUser?.displayName,
            createdAt: new Date().toDateString(),
          },
        ],
      });
    } else {
      const newRating = rating.map((m) => {
        if (m.email === auth.currentUser?.email) {
          m = {
            ...m,
            movieRating: Number(userRatings),
            createdAt: new Date().toDateString(),
          };
        }
        return m;
      });
      await updateDoc(movieRatingsRef, {
        ratings: newRating,
      });
    }
    const reef = collection(db, "movie reviews", movie.movieTitle, "reviews");
    const reviewSnapshot = await getDocs(reef);
    const userReviewDoc = reviewSnapshot.docs.find(
      (doc) =>
        doc.data().email === auth.currentUser?.email &&
        doc.data().movieRating === null
    );
    if (userReviewDoc) {
      await updateDoc(userReviewDoc.ref, {
        movieRating: Number(userRatings),
      });
    }
    dispatch(handleStarPanel());
  };

  return (
    <motion.div
      variants={popUpStyle}
      initial="hidden"
      animate="visible"
      className="w-full h-screen fixed z-20 top-0 bg-black/60 flex items-center justify-center"
    >
      <div className="w-[35%] h-64 bg-neutral-800 flex flex-col items-center justify-end space-y-6 pb-10 relative">
        <CloseButton
          className="absolute right-0 top-0"
          onClick={() => dispatch(handleStarPanel())}
        />
        <div className="absolute -top-16 flex flex-col items-center space-y-3 ">
          <div className="relative">
            <span className="absolute inset-0 center">{userRatings}</span>
            <FaStar size={80} className="text-blue-500" />
          </div>
          <h1 className="text-amber-400 font-bold text-[10px] mt-4 tracking-widest">
            RATE THIS
          </h1>
          <h1 className="text-neutral-200 capitalize text-lg">
            {movie.movieTitle}
          </h1>
        </div>
        <div className=" w-full flex items-center justify-center">
          {[...Array(10)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => {
                    dispatch(getUsersRating(currentRating));
                  }}
                />
                <div
                  onMouseLeave={() => setHover(null)}
                  onMouseEnter={() => setHover(currentRating)}
                  className="cursor-pointer h-8 w-8 items-center flex text-blue-500"
                >
                  {currentRating <= (hover || userRatings) ? (
                    <FaStar size={30} />
                  ) : (
                    <FaRegStar size={20} className="text-neutral-400" />
                  )}
                </div>
              </label>
            );
          })}
        </div>
        <button
          onClick={updateRating}
          className="rounded-3xl bg-neutral-700 px-[100px] py-1 text-neutral-300 hover:bg-neutral-500 duration-400 hover:text-white"
        >
          Rate
        </button>
      </div>
    </motion.div>
  );
};

export default StarsPanel;
