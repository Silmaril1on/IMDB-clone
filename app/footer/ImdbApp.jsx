import Image from "next/image";
import React from "react";

const ImdbApp = () => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col mr-[120px]">
        <h1 className="font-bold">Get the IMDb app</h1>
        <h1 className="text-neutral-400">For Android and iOS</h1>
      </div>
      <div className="border bg-white rounded-sm ml-5">
        <Image src="/assets/qr.png" alt="qr" width={50} height={50} />
      </div>
    </div>
  );
};

export default ImdbApp;
