import { IoMdCheckmark } from "react-icons/io";

const BookmarkSavedIcon = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-[33px] pt-1 h-12 clip bg-amber-400 flex justify-center hover:bg-amber-500 duration-300 cursor-pointer"
    >
      <IoMdCheckmark size={23} />
    </div>
  );
};

export default BookmarkSavedIcon;
