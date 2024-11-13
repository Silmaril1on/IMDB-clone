import Image from "next/image";
import React from "react";

const ImdbLinks = () => {
  return (
    <section className="center flex-col space-y-5 mt-8">
      <div className="w-full center *:capitalize space-x-10  *:cursor-pointer hover:*:underline">
        <h1>help</h1>
        <h1>site index</h1>
        <h1>IMDbPro</h1>
        <h1>Box office mojo</h1>
        <h1>license IMDb data</h1>
      </div>
      <div className="w-full center *:capitalize space-x-10  *:cursor-pointer hover:*:underline">
        <h1>press room</h1>
        <h1>advertising</h1>
        <h1>jobs</h1>
        <h1>conditions of use</h1>
        <h1>privacy policy</h1>
        <h1>your ads privacy choices</h1>
      </div>
      <Image
        className="w-auto h-auto"
        src="/assets/screensh.png"
        alt="screenshot"
        width={150}
        height={20}
        priority
      />
      <h1 className="text-neutral-400 text-[10px]">
        © 1990-2024 by IMDb.com, Inc.
      </h1>
    </section>
  );
};

export default ImdbLinks;
