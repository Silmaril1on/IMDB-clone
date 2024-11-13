import { popUpStyle } from "@/app/animations/framermotion";
import CloseButton from "@/app/components/CloseButton";
import { motion } from "framer-motion";
import Image from "next/image";
import { BiDislike } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const MovieInfoModal = ({
  handleModalClick,
  movie,
  deleteMovie,
  imdbRating,
}) => {
  const {
    moviePoster,
    movieTitle,
    movieYear,
    movieLength,
    movieGenre,
    movieBio,
    id,
  } = movie;

  return (
    <motion.div
      variants={popUpStyle}
      initial="hidden"
      animate="visible"
      className="w-full h-screen bg-black/50 center z-[5] fixed inset-0"
    >
      <div className="w-[50%] h-80 bg-neutral-800 relative p-10">
        <div className="absolute top-2 right-2">
          <CloseButton onClick={handleModalClick} />
        </div>
        <div className="flex flex-row space-x-4">
          <div className="w-20">
            <Image
              className="rounded-md hover:brightness-90"
              src={moviePoster}
              alt={movieTitle}
              width={200}
              height={200}
            />
          </div>
          <article className="flex flex-col space-y-1 text-neutral-300">
            <h1 className="text-2xl capitalize font-bold text-white">
              {movieTitle}
            </h1>
            <div className="flex space-x-2 text-sm">
              <span>{movieYear}</span>
              <span>{movieLength}</span>
            </div>
            <div className=" text-sm *:mx-1 *:capitalize font-bold">
              {movieGenre.map((item, index) => {
                const genre = item.charAt(0).toUpperCase() + item.slice(1);
                return (
                  <span key={index}>
                    {genre}
                    {index < movieGenre.length - 1 && (
                      <span className="mx-1">•</span>
                    )}
                  </span>
                );
              })}
            </div>
            <div className="flex space-x-2 items-center">
              <FaStar className="text-amber-400" />
              {imdbRating[movieTitle]}/10
            </div>
          </article>
        </div>
        <div>
          <p>{movieBio}</p>
          <div className="flex items-center py-3 space-x-3 mt-2">
            <button
              onClick={() => {
                deleteMovie(id);
                handleModalClick();
              }}
              className="flex items-center justify-center space-x-1 w-full blue-hover"
            >
              <IoMdCheckmark />
              <h1>Watchlist</h1>
            </button>
            <button className="center w-[20%] py-2 blue-hover">
              <BiDislike />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieInfoModal;
