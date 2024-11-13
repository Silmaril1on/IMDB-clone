import MovieCardComponent from "@/app/movies/moviecard/MovieComponent";

const SimiiilarMoviesSection = ({ category, title }) => {
  return (
    <section className="bg-stone-900">
      <MovieCardComponent category={category} title={title} />
    </section>
  );
};

export default SimiiilarMoviesSection;
