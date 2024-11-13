import BookmarkSavedIcon from "@/app/components/BookmarkSavedIcon";
import LoadingSpin from "@/app/components/LoadingSpin";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";

const DetailedView = ({
  data,
  deleteMovie,
  handleModalClick,
  setSelectedMovie,
  imdbRating,
  ratingLoading,
}) => {
  return (
    <div className="border border-neutral-400/60 p-2 rounded-md">
      {data?.map((item, index) => {
        const {
          movieYear,
          moviePoster,
          movieTitle,
          id,
          movieLength,
          movieBio,
          movieDirectors,
          movieActors,
        } = item;

        return (
          <Link key={id} href={`/${movieTitle}`}>
            <div className="text-black relative space-y-7 border-b border-neutral-400/60 pb-2">
              <div
                className="absolute right-2 top-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedMovie(item);
                  handleModalClick();
                }}
              >
                <IoIosInformationCircleOutline
                  className="text-blue-600 cursor-pointer"
                  size={30}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <div className="h-28 relative">
                    <div
                      onClick={(e) => {
                        deleteMovie(id);
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="absolute -top-[6.5px] -left-[4.5px] scale-75 border"
                    >
                      <BookmarkSavedIcon />
                    </div>
                    <Image
                      className="h-28 w-auto rounded-xl"
                      src={moviePoster}
                      alt={movieTitle}
                      width={300}
                      height={300}
                    />
                  </div>
                  <article className="p-1">
                    <h1 className="capitalize font-bold">
                      <span>{index + 1}.</span> {movieTitle}
                    </h1>
                    <div className="flex flex-row space-x-2 text-sm">
                      <span>{movieYear}</span>
                      <span>{movieLength}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-neutral-500">
                      <FaStar className="text-amber-400" />
                      {ratingLoading ? (
                        <LoadingSpin />
                      ) : (
                        <span>{imdbRating[movieTitle]}</span>
                      )}
                    </div>
                  </article>
                </div>
                <p className="text-sm w-[80%]">{movieBio}</p>
                <div className="flex space-x-2 items-center">
                  <h1 className="font-bold text-sm">Director </h1>
                  <span className="space-x-3">
                    {movieDirectors.map((item, index) => {
                      return (
                        <span
                          key={index}
                          className="font-normal capitalize link-style text-sm"
                        >
                          {item}
                        </span>
                      );
                    })}
                  </span>
                  <h1 className="font-bold text-sm">Stars</h1>
                  <span className="space-x-3">
                    {movieActors.slice(0, 3).map((item, index) => {
                      return (
                        <span
                          key={index}
                          className="link-style capitalize text-sm"
                        >
                          {item.actorName}
                        </span>
                      );
                    })}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default DetailedView;
