import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";

export const fetchMovies = async () => {
  const movieCollection = collection(db, "movies");
  const movieSnapshot = await getDocs(movieCollection);
  const movies = movieSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return movies;
};

export const fetchActors = async () => {
  const actorCollection = collection(db, "actors");
  const actorSnapshot = await getDocs(actorCollection);
  const actors = actorSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return actors;
};

export const fetchMovieRatings = async () => {
  const movieRatingsCol = collection(db, "movie ratings");
  const ratingsSnapshot = await getDocs(movieRatingsCol);
  const movieRatings = ratingsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return movieRatings;
};

export const fetchReviews = async (movieTitle) => {
  const movieRef = doc(db, "movie reviews", movieTitle);
  const reviewsCollectionRef = collection(movieRef, "reviews");
  const reviewsSnapshot = await getDocs(reviewsCollectionRef);
  const movieReviews = reviewsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return movieReviews;
};

export const calculateAndSetAverageRating = async (movieTitle) => {
  const movieRatingsRef = doc(db, "movie ratings", movieTitle);
  const imdbRatingsRef = doc(db, "imdb ratings", movieTitle);
  const ratingsSnapshot = await getDoc(movieRatingsRef);
  const ratingsData = ratingsSnapshot.data()?.ratings || [];
  if (ratingsData.length > 0) {
    const totalRating = ratingsData.reduce(
      (acc, curr) => acc + curr.movieRating,
      0
    );
    const averageRating = totalRating / ratingsData.length;
    await setDoc(imdbRatingsRef, { averageRating }, { merge: true });
    return Number.isInteger(averageRating)
      ? averageRating
      : averageRating.toFixed(1);
  } else {
    return "0.0";
  }
};

export const fetchUserRatings = async (movieTitle) => {
  const ratingsRef = doc(db, "movie ratings", movieTitle);
  const ratingDoc = await getDoc(ratingsRef);
  return ratingDoc.exists() ? ratingDoc.data().ratings || [] : [];
};

export const createRecentlyViewed = async (item, user, type) => {
  if (!user) {
    return;
  }
  try {
    const recentlyViewedRef = doc(db, "recently viewed", user.email);
    const newItem = {
      id: item.id,
      title: type === "movie" ? item.movieTitle : item.actorName,
      poster: type === "movie" ? item.moviePoster : item.actorAvatar,
      type: type,
    };
    await setDoc(
      recentlyViewedRef,
      {
        recentlyViewed: arrayUnion(newItem),
      },
      { merge: true }
    );
    return newItem;
  } catch (error) {
    console.error("Error adding item to recently viewed: ", error);
  }
};
