"use client";
import React, { useEffect, useState } from "react";
import ReviewsBar from "./ReviewsBar";
import UserReview from "./UserReview";
import { useMotionValueEvent, useScroll } from "framer-motion";
import ScrollToTopButton from "./ScrollToTopButton";
import { fetchReviews } from "@/app/utils";
import { db } from "@/app/firebase/firebaseConfig";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const Reviews = ({ data }) => {
  const [hidden, setHidden] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("");
  const { scrollY } = useScroll();
  const { user } = useSelector((store) => store.user);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 600) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const getReviews = async () => {
      const fetchedReviews = await fetchReviews(data.movieTitle);
      setReviewData(fetchedReviews);
    };
    getReviews();
  }, [data.movieTitle]);

  const handleLikeDislike = async (id, type) => {
    const reviewToUpdate = reviewData.find((review) => review.id === id);
    if (!reviewToUpdate) return;
    const userHasLiked = reviewToUpdate.likes.includes(user.uid);
    const userHasDisliked = reviewToUpdate.dislikes.includes(user.uid);
    try {
      const rRef = doc(db, "movie reviews", data.movieTitle, "reviews", id);
      if (type === "like") {
        if (userHasLiked) {
          await updateDoc(rRef, { likes: arrayRemove(user.uid) });
        } else {
          await updateDoc(rRef, {
            likes: arrayUnion(user.uid),
            dislikes: arrayRemove(user.uid),
          });
        }
      } else if (type === "dislike") {
        if (userHasDisliked) {
          await updateDoc(rRef, { dislikes: arrayRemove(user.uid) });
        } else {
          await updateDoc(rRef, {
            dislikes: arrayUnion(user.uid),
            likes: arrayRemove(user.uid),
          });
        }
      }
      setReviewData((prevReviews) =>
        prevReviews.map((review) =>
          review.id === id
            ? {
                ...review,
                likes:
                  type === "like"
                    ? userHasLiked
                      ? review.likes.filter((uid) => uid !== user.uid)
                      : [...review.likes, user.uid]
                    : review.likes.filter((uid) => uid !== user.uid),
                dislikes:
                  type === "dislike"
                    ? userHasDisliked
                      ? review.dislikes.filter((uid) => uid !== user.uid)
                      : [...review.dislikes, user.uid]
                    : review.dislikes.filter((uid) => uid !== user.uid),
              }
            : review
        )
      );
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const filteredReviews = ratingFilter
    ? reviewData.filter(
        (review) => review.movieRating === parseInt(ratingFilter)
      )
    : reviewData;

  return (
    <section className="bg-neutral-100 text-neutral-500 px-[8%] py-10">
      {hidden && <ScrollToTopButton />}
      <div className="w-[65%]">
        <ReviewsBar
          reviewData={reviewData}
          onFilterChange={(value) => setRatingFilter(value)}
        />
        <UserReview
          reviewData={filteredReviews}
          handleLikeDislike={handleLikeDislike}
        />
      </div>
    </section>
  );
};

export default Reviews;
