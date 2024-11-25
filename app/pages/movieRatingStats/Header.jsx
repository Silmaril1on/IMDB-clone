import React from "react";
import HeaderLinks from "../singlemoviepage/moviehero/movieheadline/HeaderLinks";
import Image from "next/image";
import Link from "next/link";

const Header = ({ data }) => {
  const bg = data.moviePoster;
  return (
    <div
      className="flex flex-col px-[7%] py-5 relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 z-0 backdrop-blur-3xl" />
      <div className="relative z-[2] ">
        <HeaderLinks data={data} />
        <div className="flex">
          <div className="w-28 h-40">
            <Image
              className="w-full h-full object-cover"
              src={data.moviePoster}
              alt={data.movieTitle}
              width={400}
              height={400}
            />
          </div>
          <article className="font-bold p-2 flex items-start justify-end flex-col">
            <Link
              href={`/${data.movieTitle}`}
              className="text-neutral-300 text-xl hover:underline"
            >
              {data.movieTitle}
            </Link>
            <span className="text-4xl">Ratings</span>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Header;
