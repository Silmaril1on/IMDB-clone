"use client";
import { auth } from "@/app/firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Error from "../Error";
import Link from "next/link";

const formData = [
  {
    id: "name",
    type: "text",
    label: "Your name",
    placeholder: "First and last name",
  },
  {
    id: "email",
    type: "email",
    label: "Your email",
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "at least 8 characters",
    alert: "Passwords must be at least 8 characters.",
  },
  {
    id: "re-password",
    type: "password",
    label: "Re-enter password",
  },
];

const SignUpComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== rePassword) {
      setError("Passwords do not match! ");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      router.push("/");
    } catch (e) {
      setError("failed to sign in, INVALID CREDENTIAL");
      console.log(e.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "re-password":
        setRePassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="border px-6 py-3 border-neutral-300 w-[30%] rounded-md flex flex-col">
      {error && <Error>{error}</Error>}
      <h1 className="text-2xl">Create account</h1>
      <form onSubmit={handleSubmit}>
        {formData.map((item) => {
          return (
            <div key={item.id} className="flex flex-col py-2">
              <label htmlFor={item.id} className="font-bold">
                {item.label}
              </label>
              <input
                id={item.id}
                type={item.type}
                placeholder={item.placeholder}
                onChange={handleChange}
                autoComplete="on"
                className="input-style"
                value={
                  item.id === "name"
                    ? name
                    : item.id === "email"
                    ? email
                    : item.id === "password"
                    ? password
                    : rePassword
                }
              />
              {item.alert && <p className="text-[10px]">{item.alert}</p>}
            </div>
          );
        })}
        <button className="reg-button">Create your IMDb account</button>
      </form>
      <div className="divider"></div>
      <div className="flex flex-row space-x-1 mt-5 text-sm">
        <h1>Already have an account? </h1>
        <Link
          href="/registration/signin"
          className="text-blue-600/70 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUpComponent;
