import Categories from "./Categories";
import SideDescButton from "./SideDescButton";

const MovieDesc = ({ data }) => {
  return (
    <section className="my-4 flex">
      <Categories data={data} />
      <SideDescButton data={data} />
    </section>
  );
};

export default MovieDesc;
