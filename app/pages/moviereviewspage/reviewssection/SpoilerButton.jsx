import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const SpoilerButton = ({ item }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      {show ? (
        <div>
          <h1 className="text-white bg-red-600 w-36 pl-2 font-bold slash-poligon rounded-sm">
            SPOILER
          </h1>
          <p>{item.movieReview}</p>
        </div>
      ) : (
        <div
          onClick={() => setShow(true)}
          className="inline-flex px-3 rounded-2xl py-1 items-center text-red-600 font-bold space-x-1 hover:bg-red-200 duration-300 cursor-pointer"
        >
          <h1>Spoiler</h1>
          <IoIosArrowDown />
        </div>
      )}
    </>
  );
};

export default SpoilerButton;
