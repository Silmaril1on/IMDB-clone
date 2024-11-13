"use client";
import { handleOpenPhoto } from "@/app/features/moviesSlice";
import { MdOutlineVideoLibrary, MdOutlinePhotoLibrary } from "react-icons/md";
import { useDispatch } from "react-redux";

const MovieMediaCollection = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-[25%] flex flex-col space-y-4 *:rounded-lg *:bg-stone-500/40 hover:*:bg-stone-600/40 *:w-full *:h-full *:center *:flex-col *:cursor-pointer">
      <div>
        <MdOutlineVideoLibrary size={40} />
        <span className="font-bold text-sm mt-3">99+ VIDEOS</span>
      </div>
      <div onClick={() => dispatch(handleOpenPhoto())}>
        <MdOutlinePhotoLibrary size={40} />
        <span className="font-bold text-sm mt-3">99+ PHOTOS</span>
      </div>
    </div>
  );
};

export default MovieMediaCollection;
