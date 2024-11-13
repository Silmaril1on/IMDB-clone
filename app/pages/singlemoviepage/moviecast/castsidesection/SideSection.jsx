import { FaAnglesDown } from "react-icons/fa6";

const SideSection = ({ data }) => {
  return (
    <div className="w-[35%] p-2">
      <div className="bg-gradient-to-tr from-neutral-200 rounded-md p-2 border-white border outline-1 outline  outline-neutral-200 shadow-md">
        <h1 className="font-bold link-style">{data.movieTitle}</h1>
        <div className="mt-5">
          <h1 className="text-sm font-bold text-neutral-500">Details</h1>
          <div className="*:link-style text-[11px] flex flex-col">
            <span>full cast and crew</span>
            <span>release dates</span>
            <span>official sites</span>
            <span>company credits</span>
            <span>filming & production</span>
            <span>technical specs</span>
            <button className="mt-8 flex space-x-1 items-center font-bold text-[13px]">
              <FaAnglesDown size={12} />
              <span> explore more</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideSection;
