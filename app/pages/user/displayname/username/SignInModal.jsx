"use client";
import CloseButton from "@/app/components/CloseButton";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { popUpStyle } from "@/app/animations/framermotion";

const SignInModal = () => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setActive(true);
      const hideTimeout = setTimeout(() => {
        setActive(false);
      }, 5000);
      return () => clearTimeout(hideTimeout);
    }, 1500);
    return () => clearTimeout(showTimeout);
  }, []);

  return (
    <>
      {active && (
        <motion.div
          variants={popUpStyle}
          initial="hidden"
          animate="visible"
          className="absolute z-10 rounded-md border-2 border-amber-400 w-72 flex flex-col -left-[155px] top-12 bg-slate-100"
        >
          <div className="absolute -z-[1] w-6 h-6 bg-amber-400 -top-2 right-20 rotate-45"></div>
          <div className="flex p-3 flex-row items-center space-x-5 relative z-[1] py-4 bg-slate-100">
            <Link
              onClick={() => setActive(false)}
              href="/registration/signin"
              className="reg-button font-bold text-black text-center"
            >
              Sign in
            </Link>
            <CloseButton
              className="text-neutral-500"
              onClick={() => setActive(false)}
            />
          </div>
          <div className="flex space-x-2 pb-3 flex-row items-center justify-center">
            <h1 className="text-neutral-500">New Customer?</h1>
            <Link href="/registration/signup" className="link-style">
              Create Account
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SignInModal;
