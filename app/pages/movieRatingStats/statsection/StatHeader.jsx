import React from "react";

const StatHeader = () => {
  return (
    <div className="flex flex-col space-y-2 my-10">
      <h1 className="gold-line-border relative text-4xl font-bold pl-3">
        IMDb rating
      </h1>
      <p className="text-neutral-600 ">
        The IMDb rating is weighted to help keep it reliable.
        <span className="link-style pl-1">Learn more</span>
      </p>
    </div>
  );
};

export default StatHeader;
