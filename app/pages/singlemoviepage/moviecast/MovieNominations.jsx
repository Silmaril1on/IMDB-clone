import { FaChevronRight } from "react-icons/fa";

const MovieNominations = () => {
  return (
    <div className="mb-14 flex items-center space-x-3 border border-amber-400 rounded-md">
      <div className="bg-amber-400 pr-6 pl-3 slash-poligon py-3">
        <span className="font-bold hover:underline cursor-pointer">
          Top rated movie #78
        </span>
      </div>

      <div className="cursor-pointer group flex items-center">
        <span className="font-bold group-hover:text-neutral-500 pr-3">
          Nominated for 1 Oscar
        </span>
        <span>70 wins & 133 nominations total</span>
        <FaChevronRight className="ml-4 group-hover:text-neutral-500" />
      </div>
    </div>
  );
};

export default MovieNominations;
