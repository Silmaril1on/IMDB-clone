import { auth, db } from "@/app/firebase/firebaseConfig";
import { addDoc, collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import ReviewSuccess from "./ReviewSuccess";

const Form = ({ data }) => {
  const [reviewHeadline, setReviewHeadline] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [letterLength, setLetterLength] = useState(300);
  const remainingLetters = letterLength - reviewText.length;
  const [disabled, setDisabled] = useState(true);
  const [reviewModal, setReviewModal] = useState(false);

  const addReview = async (e) => {
    e.preventDefault();
    try {
      const reviewRef = doc(db, "movie reviews", data.movieTitle);
      const reviewsCollectionRef = collection(reviewRef, "reviews");
      await addDoc(reviewsCollectionRef, {
        movieReview: reviewText,
        movieHeadline: reviewHeadline,
        email: auth.currentUser?.email,
        author: auth.currentUser?.displayName,
        createdAt: new Date().toDateString(),
        spoiler: isSpoiler,
        movieRating: data.imdb ? data.imdb : 0,
        likes: [],
        dislikes: [],
      });
      alert("review was added");
    } catch (error) {
      console.log(error);
    }
    setReviewModal(true);
  };

  useEffect(() => {
    setDisabled(reviewText.length < letterLength);
  }, [letterLength, reviewText.length]);

  return (
    <div>
      {reviewModal ? (
        <ReviewSuccess />
      ) : (
        <form>
          <div className="flex flex-col space-y-4 mt-2">
            <h1>YOUR REVIEW</h1>
            <input
              id="headline"
              type="text"
              value={reviewHeadline}
              onChange={(e) => setReviewHeadline(e.target.value)}
              placeholder="Write a headline for your review here"
              className="review-input-style"
            />
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <div className="text-sm">
              {letterLength > reviewText.length ? (
                <h1>
                  Required characters:
                  <span className="ml-1 font-bold text-red-500">
                    {remainingLetters}
                  </span>{" "}
                </h1>
              ) : (
                <h1 className="text-green-500">Minimum character limit met</h1>
              )}
            </div>
            <textarea
              id="review"
              type="message"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here"
              className="review-input-style h-64"
            />
            <div className="flex items-center space-x-4 mt-3">
              <h1 className="text-sm">Does this review contain spoilers?</h1>
              <div className="flex items-center space-x-1">
                <input
                  id="spoilers"
                  type="checkbox"
                  checked={isSpoiler}
                  onChange={() => setIsSpoiler(!isSpoiler)}
                  className="mr-1"
                />
                <span>{isSpoiler ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>

          <button
            disabled={disabled}
            onClick={addReview}
            className="w-full border bg-white border-neutral-800 rounded-2xl my-2 text-sm py-1"
          >
            Submit
          </button>
          <h1 className="text-[10px] text-center">
            I agree to the{" "}
            <span className="link-style">Conditions of Use.</span> The data I'm
            submitting is true and not copyrighted by a third party.
          </h1>
        </form>
      )}
    </div>
  );
};

export default Form;
