"use client";
import { SiPrime } from "react-icons/si";
import { fetchReviews } from "@/app/utils";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";

const SideDescButton = ({ data }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const fetchedReviews = await fetchReviews(data.movieTitle);
      setReviews(fetchedReviews);
    };
    getReviews();
  }, [data.movieTitle]);

  return (
    <div className="w-[40%] *:w-[70%] h-full p-10 center flex-col space-y-4">
      {data.isPrime ? <Prime /> : ""}
      <div className="reg-button flex items-center text-black space-x-2 pl-2 rounded-3xl relative">
        <FiPlus size={25} />
        <div className="flex flex-col w-full">
          <h1 className="font-bold ">Add To Watchlist</h1>
          <h1 className="text-[9px]">added by 484k users</h1>
        </div>
        <div className="w-12 border-black/50 border-l-2 z-[4] absolute h-full right-0 top-0 center">
          <IoIosArrowDown scale={25} />
        </div>
      </div>
      <div className="flex items-center space-x-4 *:link-style">
        <Link href={`/reviews/${data.movieTitle}`}>
          <h1>
            <strong className="mr-1">{reviews.length}</strong>
            User reviews
          </h1>
        </Link>
        <h1>
          <strong className="mr-1">333</strong>
          Critics reviews
        </h1>
      </div>
      <div className="flex items-center space-x-2 w-[70%]">
        <div className="bg-green-500 w-6 h-6 center">68</div>
        <h1 className="link-style text-[13px]">Metascore</h1>
      </div>
    </div>
  );
};

const Prime = () => {
  return (
    <div>
      <div className="inline-block p-1">
        <h1 className="text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-1">
          streaming
        </h1>
        <div className="bg-blue-500 w-24 h-16 rounded-xl center text-black">
          <SiPrime size={45} />
        </div>
      </div>
    </div>
  );
};

export default SideDescButton;
