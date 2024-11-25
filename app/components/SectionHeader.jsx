import { FaChevronRight } from "react-icons/fa";

const SectionHeader = ({ children }) => {
  return (
    <div className="gold-line-border relative px-3 ml-8 my-2 inline-flex items-center space-x-2 group cursor-pointer">
      <h1 className="font-bold text-xl">{children}</h1>
      <FaChevronRight
        className="group-hover:text-amber-400 group-hover:pl-2 pt-1 duration-300"
        size={25}
      />
    </div>
  );
};

export default SectionHeader;
