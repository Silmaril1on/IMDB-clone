import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
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

export const calculateAndSetAverageRating = async (id) => {
  const movieRatingsRef = doc(db, "movie ratings", id);
  const movieDocRef = doc(db, "movies", id);
  try {
    const ratingsSnapshot = await getDoc(movieRatingsRef);
    const ratingsData = ratingsSnapshot.data()?.ratings || [];
    if (ratingsData.length > 0) {
      const totalRating = ratingsData.reduce(
        (acc, curr) => acc + curr.movieRating,
        0
      );
      const averageRating = totalRating / ratingsData.length;
      const rating =
        averageRating % 1 === 0
          ? Math.round(averageRating) // Save as an integer if it's a whole number
          : averageRating.toFixed(1);
      await setDoc(movieDocRef, { imdb: rating }, { merge: true });
      return averageRating.toFixed(1);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error calculating and setting average rating:", error);
    throw error;
  }
};

export const fetchUserRatings = async (id) => {
  const ratingsRef = doc(db, "movie ratings", id);
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
    const userDoc = await getDoc(recentlyViewedRef);
    let recentlyViewedItems = userDoc.exists()
      ? userDoc.data().recentlyViewed || []
      : [];
    // Remove any existing item with the same ID
    recentlyViewedItems = recentlyViewedItems.filter(
      (viewedItem) => viewedItem.id !== newItem.id
    );
    // Add the new item to the beginning of the array
    recentlyViewedItems.unshift(newItem);
    // Limit the array to the most recent 20 items
    if (recentlyViewedItems.length > 20) {
      recentlyViewedItems.pop();
    }
    await setDoc(
      recentlyViewedRef,
      { recentlyViewed: recentlyViewedItems },
      { merge: true }
    );
    return newItem;
  } catch (error) {
    console.error("Error adding item to recently viewed: ", error);
  }
};
