import ModalReview from "../moviereviewspage/ModalReview";
import MovieCastSection from "./moviecast/MovieCastSection";
import MovieHero from "./moviehero/MovieHero";
import MovieSideSection from "./moviesidesection/MovieSideSection";
import SiimilarMovie from "./SiimilarMovie";
import SingleMoviesPanel from "./SingleMoviesPanel";
import SliderModal from "./SliderModal";

const SingleMovie = ({ data, actors }) => {
  return (
    <section>
      <MovieHero data={data} />
      <div className="flex flex-col bg-neutral-200">
        <div className="flex">
          <MovieCastSection actors={actors} data={data} />
          <MovieSideSection />
        </div>
        <SiimilarMovie data={data} />
      </div>
      <SliderModal data={data} />
      <SingleMoviesPanel movie={data} />
      <ModalReview />
    </section>
  );
};

export default SingleMovie;
