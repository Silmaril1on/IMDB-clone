"use client";
import { getRecentlyData } from "@/app/features/moviesSlice";
import { createRecentlyViewed } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const MovieResult = ({ data, setIsOpen }) => {
  const { moviePoster, movieTitle, movieYear } = data;
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { recently } = useSelector((store) => store.movie);

  const handleMovieClick = async (movie) => {
    const newMovie = await createRecentlyViewed(movie, user, "movie");
    if (newMovie) {
      dispatch(getRecentlyData([newMovie, ...recently]));
    }
  };

  return (
    <Link href={`/${movieTitle}`}>
      <div
        onClick={() => {
          setIsOpen(false);
          handleMovieClick(data);
        }}
        className="flex items-center space-x-2"
      >
        <Image
          className="w-12 h-18 object-cover"
          src={moviePoster}
          alt={movieTitle}
          width={300}
          height={300}
        />
        <div>
          <h1 className="text-white">{movieTitle}</h1>
          <span className="text-neutral-300 text-sm">{movieYear}</span>
          <div className="flex iitems-center text-sm capitalize space-x-1 text-neutral-300">
            {data.movieActors.slice(0, 2).map((item, index) => {
              return (
                <h1 key={index}>
                  {item.actorName}
                  {index < data.movieActors.slice(0, 2).length - 1 && (
                    <span>,</span>
                  )}
                </h1>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieResult;
