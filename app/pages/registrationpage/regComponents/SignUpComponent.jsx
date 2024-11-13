import Link from "next/link";
import React from "react";

const SignUpComponent = () => {
  return (
    <Link
      href="/registration/signup"
      className="bg-amber-400 mt-3 px-10 py-1 rounded-md"
    >
      <h1 className="font-bold">Create a New Account</h1>
    </Link>
  );
};

export default SignUpComponent;
