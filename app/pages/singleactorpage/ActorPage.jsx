import ActorHero from "./actorHero/ActorHero";

const ActorPage = ({ data }) => {
  return (
    <section>
      <ActorHero data={data} />
    </section>
  );
};

export default ActorPage;
