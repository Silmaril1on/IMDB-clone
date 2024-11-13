import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { BiImport } from "react-icons/bi";
import { IoMdShare } from "react-icons/io";

const WatchlistHeader = ({ children }) => {
  return (
    <section className="bg-neutral-800 p-10">
      <div className="flex space-x-5 text-lg justify-end pr-[15%] capitalize font-bold *:gray-hover *:rounded-3xl *:cursor-pointer">
        <div className="flex items-center space-x-1">
          <MdEdit size={25} />
          <h1>edit </h1>
        </div>
        <h1>public </h1>
        <div className="flex items-center space-x-1">
          <BiImport size={25} />
          <h1>export </h1>
        </div>
        <div className="flex items-center">
          <IoMdShare size={25} className="text-neutral-500" />
        </div>
      </div>
      <article className="flex items-center justify-evenly py-5">
        <div className="w-[60%] space-y-4">{children}</div>
        <div>
          <div className="flex items-center justify-center px-5 rounded-[30px] reg-button text-black space-x-3">
            <FaPlus size={25} />
            <div>
              <h1 className="font-bold leading-4">Create a new list</h1>
              <p className="text-sm">List your movie, TV & celebrity picks.</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default WatchlistHeader;
