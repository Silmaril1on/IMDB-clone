import { FaPlus } from "react-icons/fa";

const ActorDesc = ({ data }) => {
  const truncatedBio =
    data.actorBio.length > 600
      ? data.actorBio.slice(0, 600) + "..."
      : data.actorBio;

  return (
    <div className="text-white my-3 flex">
      <div className="w-[65%]">
        <p>{truncatedBio}</p>
      </div>
      <div className="w-[35%] flex justify-center pl-[5%] space-y-2 flex-col pr-[10%]">
        <h1>
          <strong>Born</strong> <span>{data.birthDate}</span>
        </h1>
        <button className="reg-button flex items-center rounded-3xl text-black font-bold text-sm">
          <FaPlus className="mx-4" />
          Add to list
        </button>
      </div>
    </div>
  );
};

export default ActorDesc;
