import { MdOutlinePhotoLibrary, MdOutlineVideoLibrary } from "react-icons/md";

const ActorMediaCollection = () => {
  return (
    <div className="w-[25%] flex flex-col space-y-4 *:rounded-lg *:bg-stone-500/40 hover:*:bg-stone-600/40 *:w-full *:h-full *:center *:flex-col *:cursor-pointer">
      <div>
        <MdOutlineVideoLibrary size={40} />
        <span className="font-bold text-sm mt-3">99+ VIDEOS</span>
      </div>
      <div>
        <MdOutlinePhotoLibrary size={40} />
        <span className="font-bold text-sm mt-3">99+ PHOTOS</span>
      </div>
    </div>
  );
};

export default ActorMediaCollection;
