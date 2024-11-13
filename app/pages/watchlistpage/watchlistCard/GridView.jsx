import BookmarkSavedIcon from "@/app/components/BookmarkSavedIcon";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const GridView = ({
  data,
  deleteMovie,
  handleModalClick,
  setSelectedMovie,
  imdbRating,
}) => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 p-4">
        {data?.map((item, index) => {
          return (
            <Link href={`/${item.movieTitle}`} key={item.id}>
              <div className="relative w-[200px] border border-neutral-300 rounded-b-xl shadow-xl">
                <div
                  onClick={(e) => {
                    deleteMovie(item.id);
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="absolute top-0 left-0"
                >
                  <BookmarkSavedIcon />
                </div>
                <div className="h-[290px] w-full">
                  <Image
                    className="h-full object-cover w-full"
                    src={item.moviePoster}
                    alt={item.movieTitle}
                    width={300}
                    height={400}
                  />
                </div>
                <article className="p-2">
                  <div className="flex items-center space-x-2 text-neutral-500">
                    <FaStar className="text-amber-400" />

                    <span>{imdbRating[item.movieTitle]}</span>
                  </div>
                  <div className="flex text-neutral-600 space-x-2">
                    <span>{index + 1}.</span>
                    <h1 className="h-14 capitalize">{item.movieTitle}</h1>
                  </div>
                  <div className="flex text-neutral-400 space-x-4 text-sm">
                    <span>{item.movieYear}</span>
                    <span>{item.movieLength}</span>
                  </div>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleModalClick();
                      setSelectedMovie(item);
                    }}
                    className="rounded-2xl my-2 bg-neutral-300 hover:bg-blue-400/20 cursor-pointer py-2 justify-center flex"
                  >
                    <h1 className="font-bold text-blue-800 text-sm">Details</h1>
                  </div>
                </article>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default GridView;
