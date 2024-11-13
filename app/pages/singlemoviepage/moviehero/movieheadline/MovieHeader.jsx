import { FaChevronRight } from "react-icons/fa";

const MovieHeader = ({ data }) => {
  return (
    <div className="w-[60%]">
      {data.movieEpisodes ? (
        <div className="mb-6 inline-flex items-center space-x-1 group cursor-pointer">
          <h1 className="font-bold text-white group-hover:underline">
            Episode guide
          </h1>
          <span className="text-neutral-400">{data.movieEpisodes}</span>
          <FaChevronRight className="group-hover:text-amber-400" />
        </div>
      ) : (
        ""
      )}
      <h1 className="text-4xl capitalize text-neutral-100">
        {data.movieTitle}
      </h1>
      <div className="flex items-center space-x-3 text-neutral-300 mt-2 capitalize">
        {data.movieType ? (
          <div className="space-x-2 flex items-center">
            <span>{data.movieType}</span>
            <span>•</span>
          </div>
        ) : (
          ""
        )}
        <span>{data.movieYear}</span>
        <span className="mx-1">•</span>
        <span>{data.movieLength}</span>
        <span className="mx-1">•</span>
        <span className="uppercase">{data.movieR}</span>
      </div>
    </div>
  );
};

export default MovieHeader;
