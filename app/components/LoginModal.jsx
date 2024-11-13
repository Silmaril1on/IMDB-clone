import Link from "next/link";
import CloseButton from "./CloseButton";
import { motion } from "framer-motion";
import { popUpStyle } from "../animations/framermotion";
import { useDispatch } from "react-redux";
import { getWarning } from "../features/moviesSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  return (
    <motion.div
      variants={popUpStyle}
      initial="hidden"
      animate="visible"
      className="fixed p-4 z-10 bottom-20 text-black space-y-3 bg-slate-100 right-4 w-64 border-2 rounded-md border-amber-400 bg-black/60 flex  flex-col"
    >
      <CloseButton
        onClick={() => dispatch(getWarning())}
        className="absolute right-2 top-2"
      />
      <h1>You are not logged in ! </h1>
      <div className="flex flex-col items-center space-y-4">
        <Link href="/signin" className="reg-button px-3 text-center">
          Sign-in
        </Link>
        <Link href="/signup" className="reg-button px-3 text-center">
          Create your IMDb
        </Link>
      </div>
    </motion.div>
  );
};

export default LoginModal;
