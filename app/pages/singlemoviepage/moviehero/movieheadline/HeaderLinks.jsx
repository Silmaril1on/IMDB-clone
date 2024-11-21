import Link from "next/link";
import { IoMdShare } from "react-icons/io";

const HeaderLinks = ({ data }) => {
  return (
    <div className="items-center flex justify-end space-x-3 font-bold text-[14px] px-2">
      <Link href={`/${data.movieTitle}/fullcast`} className="hover:underline">
        Cast & Crew
      </Link>
      <span className="mx-1">•</span>
      <Link href={`/reviews/${data.movieTitle}`} className="hover:underline">
        Users reviews
      </Link>
      <span className="mx-1">•</span>
      <h1>Trivia</h1>
      <span className="mx-1">•</span>
      <h1>FAQ</h1>
      <div className="border-x-neutral-300/50 border-x px-3">
        <h1>IMDbPro</h1>
      </div>
      <div className="gray-hover">
        <IoMdShare size={25} />
      </div>
    </div>
  );
};

export default HeaderLinks;
