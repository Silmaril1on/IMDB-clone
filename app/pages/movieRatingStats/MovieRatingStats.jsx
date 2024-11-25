import Header from "./Header";
import Statistics from "./statsection/Statistics";

const MovieRatingStats = ({ data }) => {
  return (
    <section className="">
      <Header data={data} />
      <Statistics data={data} />
    </section>
  );
};

export default MovieRatingStats;
