import DisplayWatchList from "./DisplayWatchList";
import DisplayLanguage from "./DisplayLanguage";
import DisplayUserName from "./username/DisplayUserName";

const DisplayPanel = () => {
  return (
    <div className="flex flex-row space-x-5 items-center relative">
      <DisplayWatchList />
      <DisplayUserName />
      <DisplayLanguage />
    </div>
  );
};

export default DisplayPanel;
