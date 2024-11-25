"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActorsData, getMoviesData } from "@/app/features/moviesSlice";
import { fetchActors, fetchMovies } from "@/app/utils";
import MovieCard from "./card/MovieCard";
import LoginModal from "@/app/components/LoginModal";
import LoadingSpin from "@/app/components/LoadingSpin";
import SectionHeader from "@/app/components/SectionHeader";
import SectionSubHeader from "@/app/components/SectionSubHeader";

const MovieCardComponent = ({ category, title, subTitle }) => {
  const dispatch = useDispatch();
  const { warning, movies } = useSelector((store) => store.movie);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      if (
        movies.length === 0 ||
        !movies.some((movie) => movie.movieGenre.includes(category))
      ) {
        try {
          setLoading(true);
          const movieData = await fetchMovies();
          const actorsData = await fetchActors();
          dispatch(getMoviesData(movieData));
          dispatch(getActorsData(actorsData));
        } catch (error) {
          setError("Failed to fetch movies");
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };
    getMovies();
  }, [dispatch, category, movies.length]);

  const filteredMovies = movies.filter((movie) =>
    movie.movieGenre.some(
      (genre) => genre.toLowerCase().trim() === category.toLowerCase().trim()
    )
  );

  return (
    <div>
      {warning && <LoginModal />}
      {loading ? (
        <LoadingSpin />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <section className="my-10">
          <SectionHeader>{title}</SectionHeader>
          <SectionSubHeader>{subTitle}</SectionSubHeader>
          <MovieCard movies={filteredMovies} />
        </section>
      )}
    </div>
  );
};

export default MovieCardComponent;
