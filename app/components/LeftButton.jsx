import { IoIosArrowBack } from "react-icons/io";

const LeftButton = ({ onClick, className }) => {
  return (
    <div className={className}>
      <button
        onClick={onClick}
        className="center py-4 px-[6px] border rounded-sm bg-black/40 hover:text-amber-400 hover:bg-black/70 duration-300"
      >
        <IoIosArrowBack size={20} />
      </button>
    </div>
  );
};

export default LeftButton;
