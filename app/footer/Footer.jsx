import React from "react";
import ImdbSocialMedia from "./ImdbSocialMedia";
import ImdbApp from "./ImdbApp";
import ImdbLinks from "./ImdbLinks";

const Footer = () => {
  return (
    <footer className="px-[10%] py-10">
      <div className="flex justify-center space-x-5 *:border-neutral-700 *:border-2 *:rounded-md *:p-5 *:py-2">
        <ImdbSocialMedia />
        <ImdbApp />
      </div>
      <ImdbLinks />
    </footer>
  );
};

export default Footer;
