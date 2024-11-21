import { IoIosArrowUp } from "react-icons/io";

const ScrollToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="w-full center z-[5] sticky top-10">
      <button
        onClick={handleScrollToTop}
        className="bg-neutral-200 rounded-2xl px-5 py-1 shadow-lg text-black flex items-center space-x-1 hover:bg-neutral-300"
      >
        <IoIosArrowUp />
        <span> Back to top</span>
      </button>
    </div>
  );
};

export default ScrollToTopButton;
