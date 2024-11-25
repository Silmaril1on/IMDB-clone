import HeaderLinks from "./movieheadline/HeaderLinks";
import MovieDesc from "./moviedescription/MovieDesc";
import MovieHeader from "./movieheadline/MovieHeader";
import MovieMedia from "./moviemedia/MovieMedia";
import MovieRatingsSection from "./movieheadline/MovieRatingsSection";

const MovieHero = ({ data }) => {
  const bg = data.moviePoster;
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative"
    >
      <div className="grad absolute inset-0 z-0"></div>
      <div className="backdrop-blur-3xl flex flex-col px-[8%] pt-2">
        <HeaderLinks data={data} />
        <header className="flex py-2">
          <MovieHeader data={data} />
          <MovieRatingsSection
            className="text-neutral-300 justify-end"
            data={data}
          />
        </header>
        <MovieMedia data={data} />
        <MovieDesc data={data} />
      </div>
    </div>
  );
};

export default MovieHero;
