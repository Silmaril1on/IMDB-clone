import CloseButton from "@/app/components/CloseButton";
import Image from "next/image";
import { motion } from "framer-motion";
import { popUpStyle } from "@/app/animations/framermotion";
import { FiPlus } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { BiDislike } from "react-icons/bi";
import ImdbRating from "./stars/ImdbRating";

const InfoModal = ({
  setMovieInfoModal,
  item,
  isInWatchlist,
  addToWatchlist,
  removeFromWatchlist,
}) => {
  const {
    moviePoster,
    movieTitle,
    movieYear,
    movieLength,
    movieGenre,
    movieBio,
  } = item;

  const handleWatchlist = () => {
    if (isInWatchlist) {
      removeFromWatchlist(movie);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <motion.div
      variants={popUpStyle}
      initial="hidden"
      animate="visible"
      className="w-full h-screen bg-black/50 center z-[8] fixed inset-0"
    >
      <div className="w-[50%] h-80 bg-neutral-800 relative p-10">
        <div className="absolute top-2 right-2">
          <CloseButton onClick={() => setMovieInfoModal(false)} />
        </div>
        <div className="flex flex-row space-x-4">
          <div className="w-20 h-[120px]">
            <Image
              className="rounded-md h-full object-cover hover:brightness-90"
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
            <ImdbRating item={item} />
          </article>
        </div>
        <div>
          <p>{movieBio}</p>
          <div className="flex items-center py-3 space-x-3 mt-2">
            <button
              onClick={handleWatchlist}
              className="flex items-center justify-center space-x-1 w-full blue-hover"
            >
              {isInWatchlist ? <IoMdCheckmark /> : <FiPlus />}
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

export default InfoModal;
