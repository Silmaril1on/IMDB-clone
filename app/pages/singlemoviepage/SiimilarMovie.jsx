"use client";
import { useSelector } from "react-redux";
import SimiiilarMoviesSection from "./moviecast/SimiiilarMoviesSection";

const SiimilarMovie = ({ data }) => {
  const { movies } = useSelector((store) => store.movie);

  const currentMovieGenres = Array.isArray(data.movieGenre)
    ? data.movieGenre
    : [data.movieGenre];

  const filteredSimilarMovies = movies.filter((movie) => {
    const movieGenres = Array.isArray(movie.movieGenre)
      ? movie.movieGenre
      : [movie.movieGenre];
    const isSameGenre = movieGenres.some((genre) =>
      currentMovieGenres.includes(genre)
    );
    const isDifferentMovie = movie.id !== data.id;
    return isSameGenre && isDifferentMovie;
  });

  const category = currentMovieGenres[0] || "Unknown Genre";

  return <SimiiilarMoviesSection category={category} title="More like this" />;
};

export default SiimilarMovie;
