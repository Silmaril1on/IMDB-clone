"use client";
import { getUser, logOutUser } from "@/app/features/userSlice";
import { auth } from "@/app/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignInModal from "./SignInModal";
import UserSettingsPanel from "./UserSettingsPanel";
import { FaCaretDown, FaCaretUp, FaUserCircle } from "react-icons/fa";
import Image from "next/image";

const DisplayUserName = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(getUser(currentUser));
      } else {
        dispatch(logOutUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="gray-hover">
      {user ? (
        <div className="relative" onClick={() => setActive(!active)}>
          <div className="flex flex-row items-center space-x-1 cursor-pointer">
            <div>
              {user?.photoURL ? (
                <Image
                  src={user?.photoURL}
                  alt="user-avatar"
                  width={8}
                  height={8}
                />
              ) : (
                <FaUserCircle />
              )}
            </div>
            <h1 className="font-bold capitalize">{user?.displayName}</h1>
            {active ? <FaCaretUp /> : <FaCaretDown />}
          </div>
          <UserSettingsPanel active={active} setActive={setActive} />
        </div>
      ) : (
        <div className="relative">
          <Link href="/registration" className="font-bold">
            Sign In
          </Link>
          <SignInModal />
        </div>
      )}
    </div>
  );
};

export default DisplayUserName;
