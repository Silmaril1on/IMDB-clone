import MovieMediaCollection from "./MovieMediaCollection";
import MoviePoster from "./MoviePoster";
import MovieTrailer from "./MovieTrailer";

const MovieMedia = ({ data }) => {
  return (
    <div className="flex space-x-3">
      <MoviePoster data={data} />
      <MovieTrailer data={data} />
      <MovieMediaCollection data={data} />
    </div>
  );
};

export default MovieMedia;
