import Image from "next/image";

const ActorPoster = ({ data }) => {
  return (
    <div className="w-[400px]">
      <Image
        className="w-full h-full rounded-lg"
        src={data?.actorAvatar}
        alt={data.actorName}
        width={400}
        height={400}
      />
    </div>
  );
};

export default ActorPoster;
