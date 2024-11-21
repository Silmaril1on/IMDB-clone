import { AnimatePresence, motion } from "framer-motion";
import { fromTop } from "@/app/animations/framermotion";
import SettingsList from "./SettingsList";
import SettingsHead from "./SettingsHead";

const Settings = () => {
  return (
    <AnimatePresence>
      <motion.div
        variants={fromTop}
        initial="hidden"
        animate="visible"
        className="fixed overflow-auto z-[7] h-full inset-0 bg-neutral-800"
      >
        <SettingsHead />
        <SettingsList />
      </motion.div>
    </AnimatePresence>
  );
};

export default Settings;
