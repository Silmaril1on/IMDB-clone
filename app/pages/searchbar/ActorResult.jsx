"use client";
import { getRecentlyData } from "@/app/features/moviesSlice";
import { createRecentlyViewed } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const ActorResult = ({ data, setIsOpen }) => {
  const { actorAvatar, actorName } = data;
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { recently } = useSelector((store) => store.movie);

  const handleActorClick = async (actor) => {
    const newActor = await createRecentlyViewed(actor, user, "actor");
    if (newActor) {
      dispatch(getRecentlyData([newActor, ...recently]));
    }
  };
  return (
    <Link href={`/actors/${actorName}`}>
      <div
        onClick={() => {
          setIsOpen(false);
          handleActorClick(data);
        }}
        className="flex items-center space-x-2"
      >
        <Image
          className="w-12 h-18 object-cover"
          src={actorAvatar}
          alt={actorName}
          width={300}
          height={300}
        />
        <div className="flex flex-col">
          <h1 className="text-white">{actorName}</h1>
          <div>
            {data.actorWorks.slice(0, 1).map((item, index) => {
              return (
                <h1 key={index} className="text-sm text-neutral-300 capitalize">
                  {item}
                </h1>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActorResult;
