import SideSection from "../castsidesection/SideSection";
import CastHeadline from "./CastHeadline";
import CastSection from "./CastSection";

const MovieCastPage = ({ data, actors }) => {
  return (
    <div className="bg-white p-5 text-black flex">
      <div className="space-y-6 flex flex-col w-[65%]">
        <CastHeadline data={data} />
        <CastSection data={data} actors={actors} />
      </div>
      <SideSection data={data} />
    </div>
  );
};

export default MovieCastPage;
