"use client";
import { handleMenuSettings } from "@/app/features/moviesSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";

const Menu = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div
        onClick={() => dispatch(handleMenuSettings())}
        className="flex items-center space-x-1 gray-hover"
      >
        <GiHamburgerMenu />
        <h1 className="font-bold">Menu</h1>
      </div>
    </div>
  );
};

export default Menu;
