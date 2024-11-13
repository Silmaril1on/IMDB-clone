import { IoMdShare } from "react-icons/io";

const ActorLinks = () => {
  return (
    <div className="items-center flex justify-end space-x-3 font-bold text-[12px] px-2">
      <h1>Biography</h1>
      <span className="mx-1">•</span>
      <h1>Awards</h1>
      <span className="mx-1">•</span>
      <h1>Trivia</h1>
      <div className="border-x-neutral-300/50 border-x px-3">
        <h1>IMDbPro</h1>
      </div>
      <div className="gray-hover">
        <IoMdShare size={25} />
      </div>
    </div>
  );
};

export default ActorLinks;
