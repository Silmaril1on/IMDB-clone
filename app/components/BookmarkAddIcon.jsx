import { GoPlus } from "react-icons/go";

const BookmarkAddIcon = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-[33px] pt-1 h-12 clip bg-stone-800/70 flex justify-center hover:bg-stone-800/40 duration-300 cursor-pointer"
    >
      <GoPlus size={23} />
    </div>
  );
};

export default BookmarkAddIcon;
