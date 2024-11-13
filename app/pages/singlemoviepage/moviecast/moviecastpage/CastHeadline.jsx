import ImdbProLogo from "@/app/components/ImdbProLogo";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CastHeadline = ({ data }) => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div>
          <Image
            className="h-28 w-auto"
            src={data.moviePoster}
            width={200}
            height={200}
            alt={data.movieTitle}
          />
        </div>
        <div className="flex flex-col pl-2">
          <article className="flex items-center space-x-1">
            <Link
              href={`/${data.movieTitle}`}
              className="capitalize link-style text-lg"
            >
              {data.movieTitle}
            </Link>
            <span>({data.movieYear})</span>
          </article>
          <h1 className="text-3xl">Full Cast & Crew</h1>
          <div className="flex items-center space-x-1 border border-neutral-300 rounded-md py-1 px-2 mt-2">
            <ImdbProLogo className="text-black" />
            <span className="link-style text-sm">
              See agents for this cast & crew on IMDbPro
            </span>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-neutral-600 overflow-hidden font-bold relative before:absolute before:h-[1px] before:bg-neutral-200 before:w-full before:-right-[9%] before:top-[55%]">
          Directed by
        </h1>
        <span className="flex w-[20%] flex-col pl-3 mt-2">
          {data.movieDirectors.map((item, index) => {
            return (
              <span className="link-style text-sm capitalize" key={index}>
                {item}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
};

export default CastHeadline;
