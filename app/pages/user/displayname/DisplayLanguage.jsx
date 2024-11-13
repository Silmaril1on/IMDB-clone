"use client";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { popUpStyle } from "@/app/animations/framermotion";

const langs = [
  "English (United States)",
  "Francais (Canada)",
  "Italiano (italia)",
  "portugues (Brasil)",
  "Espanol (espana)",
];

const DisplayLanguage = () => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(0);
  const currentLang = langs[active]?.slice(0, 3).toUpperCase();

  return (
    <div
      onClick={() => setShow(!show)}
      className="flex flex-row gray-hover items-center space-x-1 font-bold relative cursor-pointer w-20"
    >
      <h1>{currentLang}</h1>
      {show ? <FaCaretUp /> : <FaCaretDown />}
      {show && (
        <Languages active={active} setActive={setActive} setShow={setShow} />
      )}
    </div>
  );
};

const Languages = ({ active, setActive, setShow }) => {
  return (
    <motion.div
      variants={popUpStyle}
      initial="hidden"
      animate="visible"
      onMouseLeave={() => setShow(false)}
      className="absolute z-[6] shadow-2xl -left-[190px] w-64 top-12 flex flex-col bg-stone-900 py-2"
    >
      <h1 className="border-b px-2 border-stone-400 py-2 text-sm">
        SUPPORTED LANGUAGES
      </h1>
      <div className="flex flex-col items-center font-normal py-2">
        {langs.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => setActive(index)}
              className="flex flex-row items-center w-full space-x-2 hover:bg-stone-600 py-3 px-3 hover:cursor-pointer duration-300"
            >
              {active === index ? (
                <div className="rounded-full border-amber-400 border-[2px] w-4 h-4 flex items-center justify-center">
                  <div className="bg-amber-400 rounded-full w-2 h-2"></div>
                </div>
              ) : (
                <div className="rounded-full border-[2.5px] w-4 h-4"></div>
              )}
              <h1>{item}</h1>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default DisplayLanguage;
