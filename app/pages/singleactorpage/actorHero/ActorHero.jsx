import ActorHeader from "./actorcomponents/ActorHeader";
import ActorMedia from "./actorcomponents/actormedia/ActorMedia";
import ActorDesc from "./actorcomponents/actormedia/ActorDesc";
import ActorLinks from "./actorcomponents/actorlinks/ActorLinks";

const ActorHero = ({ data }) => {
  const bg = data.actorAvatar;
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
      <div className=" backdrop-blur-3xl flex flex-col px-[8%] pt-2">
        <ActorLinks />
        <header className="flex py-2">
          <ActorHeader data={data} />
        </header>
        <ActorMedia data={data} />
        <ActorDesc data={data} />
      </div>
    </div>
  );
};

export default ActorHero;
