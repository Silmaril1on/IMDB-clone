import PageLogo from "../components/PageLogo";
import SearchBar from "../pages/searchbar/SearchBar";
import DisplayPanel from "../pages/user/displayname/DisplayPanel";

const Navigation = () => {
  return (
    <nav className="flex flex-row space-x-2 items-center px-[7%] w-full justify-between bg-stone-900">
      <PageLogo className="w-16" />
      <div className="px-2 border">
        <h1>menu</h1>
      </div>
      <SearchBar />
      <DisplayPanel />
    </nav>
  );
};

export default Navigation;
