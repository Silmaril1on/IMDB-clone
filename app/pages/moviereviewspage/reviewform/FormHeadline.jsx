import Image from "next/image";
import React from "react";

const FormHeadline = ({ data }) => {
  return (
    <div className="flex space-x-2 items-start">
      <div className="w-16">
        <Image
          width={200}
          height={200}
          src={data.moviePoster}
          alt={data.movieTitle}
        />
      </div>
      <article className="flex flex-col space-y-2">
        <div className="flex items-center space-x-1">
          <h1 className="capitalize font-bold text-lg">{data.movieTitle}</h1>
          <span>({data.movieYear})</span>
        </div>
        <div className="flex items-center">
          <h1 className="text-2xl text-black font-bold">Add an item</h1>
        </div>
      </article>
    </div>
  );
};

export default FormHeadline;
