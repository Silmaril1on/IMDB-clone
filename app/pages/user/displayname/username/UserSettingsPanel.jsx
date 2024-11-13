import { popUpStyle } from "@/app/animations/framermotion";
import SignOut from "@/app/pages/authentication/signout/SignOut";
import { motion } from "framer-motion";
import Link from "next/link";

const UserSettingsPanel = ({ active, setActive }) => {
  return (
    <>
      {active && (
        <motion.div
          variants={popUpStyle}
          initial="hidden"
          animate="visible"
          onMouseLeave={() => setActive(false)}
          className="absolute top-11 w-48 z-[6] -left-[90px] flex flex-col py-2 *:capitalize space-y-2 bg-stone-900 *:py-2 hover:*:bg-stone-500 *:duration-300 *:px-2 *:cursor-pointer shadow-2xl"
        >
          <h1>your activity</h1>
          <Link href="/watchlist">your watchlist</Link>
          <Link href="/ratings">your ratings</Link>
          <h1>your list</h1>
          <h1>account settings</h1>
          <SignOut />
        </motion.div>
      )}
    </>
  );
};

export default UserSettingsPanel;
