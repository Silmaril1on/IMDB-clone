import { useSelector } from "react-redux";
import { TfiViewList, TfiViewGrid } from "react-icons/tfi";

const ReorderComponent = ({ activeLayout, setActiveLyout, dataType }) => {
  const { watchlist, ratedMovies } = useSelector((store) => store.movie);
  const type = dataType === "watchlist" ? watchlist : ratedMovies;
  return (
    <div className="text-black flex justify-between w-full my-3 px-3 py-3 items-center">
      <h1>{type?.length} titles</h1>
      <div className="flex items-center space-x-5 *:text-xl *:cursor-pointer">
        <TfiViewGrid
          className={activeLayout === 0 ? "text-blue-500 " : ""}
          onClick={() => setActiveLyout(0)}
        />
        <TfiViewList
          className={activeLayout === 1 ? "text-blue-500 " : ""}
          onClick={() => setActiveLyout(1)}
        />
      </div>
    </div>
  );
};

export default ReorderComponent;
