import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import ImdbRating from "./stars/ImdbRating";
import UsersRating from "./stars/UsersRating";

const MovieCardInfo = ({
  item,
  setSelectedMovie,
  setOpenStarPanel,
  addToWatchlist,
  isInWatchlist,
  setMovieInfoModal,
}) => {
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="flex flex-col my-2 p-2 space-y-2 items-center cursor-auto">
      <div className="flex justify-start w-full space-x-3">
        <ImdbRating item={item} />
        <UsersRating
          setSelectedMovie={setSelectedMovie}
          setOpenStarPanel={setOpenStarPanel}
          item={item}
        />
      </div>
      <h1 className="capitalize w-full h-14 hover:underline cursor-pointer">
        {truncateString(item.movieTitle, 44)}
      </h1>

      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToWatchlist(item);
        }}
        className="center space-x-1 text-blue-500 w-full rounded-2xl bg-neutral-700 py-1 hover:bg-blue-400/20 duration-300 cursor-pointer pr-1"
      >
        {isInWatchlist ? <IoMdCheckmark /> : <FiPlus />}
        <h1>Watchlist</h1>
      </div>
      <article className="flex items-center w-full justify-between px-3">
        <div className="center space-x-1 rounded-2xl hover:bg-neutral-700 py-1 px-3 cursor-pointer">
          <FaPlay />
          <h1>Trailer</h1>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMovieInfoModal(true);
          }}
          className="rounded-full hover:bg-neutral-700 cursor-pointer p-2"
        >
          <IoIosInformationCircleOutline size={25} />
        </div>
      </article>
    </div>
  );
};

export default MovieCardInfo;
