import { db } from "@/app/firebase/firebaseConfig";
import MovieRatingStats from "@/app/pages/movieRatingStats/MovieRatingStats";
import { collection, getDocs } from "firebase/firestore";

const fetchMovies = async () => {
  const movieCollection = collection(db, "movies");
  const movieSnapshot = await getDocs(movieCollection);
  const movies = movieSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return movies;
};

export const generateMetadata = async ({ params }) => {
  const movies = await fetchMovies();
  const movieName = decodeURIComponent(params.moviename);
  const singleMovie = movies?.find((item) => item?.movieTitle === movieName);
  const capitalizeTitle = (title) => {
    return title
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return {
    title: `${capitalizeTitle(singleMovie?.movieTitle)} - Ratings`,
  };
};

const MovieratingsPage = async ({ params }) => {
  const movieName = decodeURIComponent(params.moviename);
  const movies = await fetchMovies();
  const SingleMovieData = movies.find(
    (movie) => movie.movieTitle === movieName
  );

  return (
    <div>
      <MovieRatingStats data={SingleMovieData} />
    </div>
  );
};

export default MovieratingsPage;
