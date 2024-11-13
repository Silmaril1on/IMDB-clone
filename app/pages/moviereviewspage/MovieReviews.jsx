import React from "react";
import ReviewHeader from "./reviewsheader/ReviewHeader";
import Reviews from "./reviewssection/Reviews";
import ReviewFormPanel from "./reviewform/ReviewFormPanel";
import ModalReview from "./ModalReview";

const MovieReviews = ({ data }) => {
  return (
    <div className="relative">
      <ReviewHeader data={data} />
      <Reviews data={data} />
      <ReviewFormPanel data={data} />
      <ModalReview />
    </div>
  );
};

export default MovieReviews;
