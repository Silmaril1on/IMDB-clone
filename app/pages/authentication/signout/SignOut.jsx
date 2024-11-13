import { auth } from "@/app/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import React from "react";

const SignOut = () => {
  const handleLougout = async () => {
    try {
      await signOut(auth);
      console.log("you are logged out");
    } catch (error) {
      console.log("logout error", error);
    }
  };

  return (
    <div>
      <button onClick={handleLougout}>Sign Out</button>
    </div>
  );
};

export default SignOut;
