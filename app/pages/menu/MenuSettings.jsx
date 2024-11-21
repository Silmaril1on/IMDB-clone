"use client";
import { useSelector } from "react-redux";
import Settings from "./settings/Settings";

const MenuSettings = () => {
  const { menuSettingsModal } = useSelector((store) => store.movie);

  return <>{menuSettingsModal && <Settings />}</>;
};

export default MenuSettings;
