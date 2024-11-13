import PageLogo from "@/app/components/PageLogo";
import React from "react";
import SignUpComponent from "./SignUpComponent";
import AuthFooter from "../AuthFooter";

const SignUp = () => {
  return (
    <section className="bg-neutral-100 h-screen text-black absolute inset-0 flex items-center flex-col">
      <PageLogo className="w-32" />
      <SignUpComponent />
      <div className="relative mt-10 w-full h-5 before:bg-divider before:inset-0 before:h-[1px] before:absolute before:bottom-0"></div>
      <AuthFooter />
    </section>
  );
};

export default SignUp;
