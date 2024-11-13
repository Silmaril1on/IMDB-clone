import Image from "next/image";
import Link from "next/link";
import React from "react";

const CastSection = ({ data, actors }) => {
  const actorsList = data.movieActors.map((item) => ({
    actorName: item.actorName.toLowerCase(),
    characterName: item.characterName,
  }));

  const matchedActors = actors.filter((actor) =>
    actorsList.some(
      (movieActor) => movieActor.actorName === actor.actorName.toLowerCase()
    )
  );

  return (
    <div>
      <div className="py-2 flex  overflow-hidden items-center space-x-1 relative before:absolute before:h-[1px] before:bg-neutral-200 before:w-full before:-right-[24%] before:top-[55%]">
        <h1 className="text-neutral-600 overflow-hidden font-bold ">Cast</h1>
        <span className="text-[12px]">
          (in credits order) verified as complete
        </span>
      </div>
      <div className="space-y-1">
        {matchedActors.map((item, index) => {
          const movieActor = actorsList.find(
            (movieActor) =>
              movieActor.actorName === item.actorName.toLowerCase()
          );
          return (
            <div key={index} className="flex items-center">
              <div className="w-12 h-16 overflow-hidden">
                <Image
                  src={item.actorAvatar}
                  alt={item.actorName}
                  width={150}
                  height={150}
                />
              </div>
              <article className="flex justify-between w-full pl-4 ">
                <Link
                  href={`/actors/${item.actorName}`}
                  className="hover:underline cursor-pointer link-style"
                >
                  {item.actorName}
                </Link>
                <h1 className="capitalize link-style text-sm">
                  {movieActor?.characterName}
                </h1>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CastSection;
