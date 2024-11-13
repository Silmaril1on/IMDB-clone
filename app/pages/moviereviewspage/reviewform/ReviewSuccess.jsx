import Image from "next/image";
import React from "react";

const ReviewSuccess = () => {
  return (
    <div className="center relative">
      <Image src="/assets/festive.gif" width={500} height={500} alt="success" />
      <h1 className="text-4xl font-bold text-center absolute inser-0">
        Review added successfully
      </h1>
    </div>
  );
};

export default ReviewSuccess;
