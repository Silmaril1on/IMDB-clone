import PageLogo from "../components/PageLogo";
import Menu from "../pages/menu/Menu";
import SearchBar from "../pages/searchbar/SearchBar";
import DisplayPanel from "../pages/user/displayname/DisplayPanel";

const Navigation = () => {
  return (
    <nav className="flex flex-row space-x-2 items-center px-[7%] w-full justify-between bg-stone-900">
      <PageLogo className="w-16" />
      <Menu />
      <SearchBar />
      <DisplayPanel />
    </nav>
  );
};

export default Navigation;
