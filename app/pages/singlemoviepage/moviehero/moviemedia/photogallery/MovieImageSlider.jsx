"use client";
import CloseButton from "@/app/components/CloseButton";
import LeftButton from "@/app/components/LeftButton";
import RightButton from "@/app/components/RightButton";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { popUpStyle } from "@/app/animations/framermotion";
import { CiCircleInfo } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { handleOpenPhoto } from "@/app/features/moviesSlice";
import UploadMovieImage from "./UploadMovieImage";

const MovieImageSlider = ({ data }) => {
  const [active, setActive] = useState(0);
  const [openUpload, setOpenUpload] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setOpenUpload(!openUpload);
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % data.moviePhotos?.length);
  };

  const handlePrev = () => {
    setActive(
      (prev) => (prev - 1 + data.moviePhotos.length) % data.moviePhotos?.length
    );
  };

  return (
    <motion.section
      variants={popUpStyle}
      initial="hidden"
      animate="visible"
      className="fixed top-0 inset-0 z-10 bg-black/60 center backdrop-blur-md"
    >
      <div
        onClick={() => dispatch(handleOpenPhoto())}
        className="absolute gray-hover top-4 left-8 flex items-center space-x-1"
      >
        <CloseButton />
        <h1 className="font-bold">Close</h1>
      </div>
      <div className="absolute top-4 right-8 text-amber-400 space-x-1 flex">
        <span>{active + 1}</span>
        <span>of</span>
        <span>{data.moviePhotos?.length}</span>
      </div>
      <div className="w-[70%] h-[75%] bg-black center relative group overflow-hidden">
        {data.moviePhotos ? (
          <>
            <Image
              className="w-full"
              src={data.moviePhotos[active]}
              alt="movie-photos"
              width={900}
              height={900}
              priority
            />
            <div className="absolute flex items-center w-full justify-between px-4 opacity-0 group-hover:opacity-100 duration-300">
              <LeftButton onClick={handlePrev} />
              <RightButton onClick={handleNext} />
            </div>
          </>
        ) : (
          <h1 className="text-amber-400 text-2xl text-center">
            Photo gallery is currently empty... <br /> Please upload any photos
            from this movie
          </h1>
        )}
      </div>
      <div className="absolute right-8 bottom-8">
        {openUpload || (
          <div className="gray-hover" onClick={openModal}>
            <CiCircleInfo size={30} />
          </div>
        )}
      </div>
      {openUpload && <UploadMovieImage data={data} openModal={openModal} />}
    </motion.section>
  );
};

export default MovieImageSlider;
