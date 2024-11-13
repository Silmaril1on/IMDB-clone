"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import Error from "../Error";
import { auth } from "@/app/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (e) {
      setError("failed to sign in, INVALID CREDENTIAL");
      console.log(e.message);
    }
  };

  return (
    <div className="border px-6 py-3 border-neutral-300 w-[30%] rounded-md flex flex-col">
      {error && <Error>{error}</Error>}
      <h1 className="text-3xl">Sign in</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <label htmlFor="email" className="font-bold text-sm">
            Email Address
          </label>
          <input
            autoComplete="on"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="input-style"
          />
        </div>
        <div className="flex flex-col py-2">
          <div className="flex flex-row justify-between">
            <label htmlFor="password" className="font-bold text-sm">
              Password
            </label>
            <Link href="/" className="link-style text-sm">
              Forgot password?
            </Link>
          </div>
          <input
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="input-style"
          />
        </div>
        <button className="reg-button">Sign in </button>
      </form>
      <h1 className="w-full text-center opacity-50 text-sm mt-6">
        New to IMDb?
      </h1>
      <Link
        href="/registration/signup"
        className="border text-center border-neutral-300 rounded-md py-1 shadow-md hover:bg-neutral-200 mt-2 text-sm"
      >
        Create your IMDb account
      </Link>
    </div>
  );
};

export default LoginComponent;
