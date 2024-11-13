"use client";
import Image from "next/image";
import Link from "next/link";
import MovieNominations from "./MovieNominations";
import { FaChevronRight } from "react-icons/fa";
import { createRecentlyViewed } from "@/app/utils";
import { useDispatch, useSelector } from "react-redux";
import { getRecentlyData } from "@/app/features/moviesSlice";

const MovieCastSection = ({ data, actors }) => {
  const dispatch = useDispatch();
  const { recently } = useSelector((store) => store.movie);
  const { user } = useSelector((store) => store.user);
  const actorsList = data.movieActors.map((item) => ({
    actorName: item.actorName.toLowerCase(),
    characterName: item.characterName,
    actorEpisodes: item.actorEpisodes,
  }));

  const matchedActors = actors.filter((actor) =>
    actorsList.some(
      (movieActor) => movieActor.actorName === actor.actorName.toLowerCase()
    )
  );

  const handleActorClick = async (actor) => {
    const newActor = await createRecentlyViewed(actor, user, "actor");
    if (newActor) {
      dispatch(getRecentlyData([newActor, ...recently]));
    }
  };

  return (
    <section className="w-[70%] border py-10 px-[8%] text-neutral-800">
      <MovieNominations />
      <Link
        href={`/${data.movieTitle}/cast`}
        className="relative gold-line-border px-4 inline-flex items-center space-x-3 group cursor-pointer"
      >
        <h1 className="text-3xl font-bold ">Top cast</h1>
        <span className="text-neutral-400">{actorsList.length}</span>
        <FaChevronRight
          size={30}
          className="group-hover:text-amber-400 duration-300"
        />
      </Link>
      <div className="my-6 grid grid-cols-2 gap-5">
        {matchedActors.slice(0, 12).map((item) => {
          const movieActor = actorsList.find(
            (movieActor) =>
              movieActor.actorName === item.actorName.toLowerCase()
          );
          return (
            <Link href={`/actors/${item.actorName}`} key={item.id}>
              <div
                onClick={() => handleActorClick(item)}
                className="flex items-center"
              >
                <div className="w-24 h-24 overflow-hidden rounded-full">
                  <Image
                    src={item.actorAvatar}
                    alt={item.actorName}
                    width={150}
                    height={150}
                  />
                </div>
                <article className="flex flex-col pl-4">
                  <h1 className="font-bold hover:text-neutral-500 hover:underline cursor-pointer">
                    {item.actorName}
                  </h1>
                  <h1 className="capitalize text-neutral-500">
                    {movieActor?.characterName}
                  </h1>
                  {movieActor.actorEpisodes ? (
                    <h1 className="text-[11px] text-neutral-500">
                      {movieActor.actorEpisodes}
                    </h1>
                  ) : (
                    ""
                  )}
                </article>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col *:border-b *:border-b-neutral-300 *:py-2">
        <CastDirector data={data} />
        <CastWriters data={data} />
        <Link
          href={`/${data.movieTitle}/cast`}
          className="font-bold hover:text-neutral-500 w-36"
        >
          All cast & crew
        </Link>
      </div>
    </section>
  );
};

const CastDirector = ({ data }) => {
  const directors = data.movieDirectors;
  return (
    <div className="flex items-center">
      <h1 className="font-bold text-black w-20">Directors</h1>
      <div className="flex">
        {directors.map((item, index) => {
          const directors = item.charAt(0).toUpperCase() + item.slice(1);
          return (
            <div key={index} className="flex items-center space-x-3 ml-2">
              <h1 className="link-style">{directors}</h1>
              {index < data.length - 1 && <span className="mx-1">•</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CastWriters = ({ data }) => {
  const writers = data.movieWriters;
  return (
    <div className="flex items-center">
      <h1 className="font-bold text-black w-20">Writers</h1>
      <div className="flex">
        {writers.map((item, index) => {
          const writers = item.charAt(0).toUpperCase() + item.slice(1);
          return (
            <div key={index} className="flex items-center space-x-3 ml-2">
              <h1 className="link-style capitalize">{writers}</h1>
              {index < writers.length - 1 && (
                <span className="mx-1 text-blue-600">•</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieCastSection;
