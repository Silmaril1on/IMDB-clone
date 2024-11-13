"use client";
import { useRef, useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";

const MovieTrailer = ({ data }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="flex w-full">
      <div className="relative w-full">
        <video
          ref={videoRef}
          className="h-full w-full rounded-xl"
          preload="false"
          onClick={handlePlayPause}
        >
          <source src={data.movieTrailer} type="video/mp4" />
        </video>
        {!isPlaying && (
          <button
            onClick={handlePlayPause}
            className="absolute bottom-4 left-4 flex items-center"
          >
            <IoPlayCircleOutline size={50} />
            <h1 className="text-lg ml-2">Play Trailer</h1>
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieTrailer;
